from flask import Flask, json, jsonify, make_response
from flask.json import JSONEncoder
from pymongo import MongoClient
from flask_restx import reqparse, Api, Resource  # Api 구현을 위한 Api 객체 import
from flask_cors import CORS

# AI모델을 읽어오기위한 라이브러리
# 개인개발하실떄에는 제가 ## 표시한 부분을 주석처리하고 하시면 덜 무거워집니다.
import tensorflow_hub as hub ##
import tensorflow as tf ##
import tensorflow_text ##
from ai import cal_similarity ##

app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
app.config['JSON_AS_ASCII'] = False

api = Api(app)  # Flask 객체에 Api 객체 등록

CORS(app) #다른 포트번호에 대한 보안 제거 

parser = reqparse.RequestParser()

# db 연동
host = "mongo_db" #단독실행시 localhost / docker실행시 mongo_db
port = "27017"
conn = MongoClient(host, int(port))

# db 생성
db = conn.vitaminc

# collection 생성
collect = db.trademark
collect2 = db.ai

# Embbeding 모델 읽어오기.
module_url = 'https://tfhub.dev/google/universal-sentence-encoder-multilingual/3' ##
model = hub.load(module_url) ##
#api 구현 
@api.route('/api')
class index(Resource):
    def get(self):
        return "Hello World!"

@api.route('/api/show_data')
class showData(Resource):
    def get(self):
        s = ''
        isFirst = True
        results = collect.find()
        for result in results:
            if isFirst == True:
                s += str(result)
                isFirst = False
            else:
                s = s + ', '+ str(result)
        #print(s)
        return s

@api.route('/api/data_transmit')
class saveTrademark(Resource):
    parser.add_argument('title',type=str, default='', help='상표명')
    parser.add_argument('category',type=int, default=0, help='카테고리번호')

    @api.expect(parser)
    @api.response(201,'success')
    @api.response(400,'bad request')
    @api.response(500,'server error')

    def post(self):
        args = parser.parse_args()
        title = args['title']
        category = args['category']
        
        results = collect.find_one({"title":title, "category":category})

        if results != None: #아예 중복되는 데이터가 있는 경우 
            print(results)
            return jsonify({
                "status": 201,
                "success": True,
                "results": str(results),
                "message": "데이터 등록 성공"
            })
                
        else: #중복 없으면 insert  
            top_k_sim, top_k_title, _ = cal_similarity(model, title, word_cloud=True, top_k=5) ## 

            doc = {
            "title" : title,
            "category" : category,
            "top_k_sim" : top_k_sim,##
            "top_k_title":top_k_title##
            }

            collect.insert(doc)

            return jsonify({
                "status": 201,
                "success": True,
                "results": {
                    "title" : title,
                    "category" : category,
                    "top_k_sim" : top_k_sim,##
                    "top_k_title":top_k_title##
                },
                "message": "데이터 등록 성공"
            })