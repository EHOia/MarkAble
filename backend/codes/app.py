from flask import Flask, json, jsonify, make_response
from flask.json import JSONEncoder
from pymongo import MongoClient
from flask_restx import reqparse, Api, Resource, Namespace # Api 구현을 위한 Api 객체 import
from flask_cors import CORS
from elastic_func import search_similar_text

app = Flask(__name__) # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
app.config['JSON_AS_ASCII'] = False

api = Api(app) # Flask 객체에 Api 객체 등록
ns = api.namespace('trademark', description= '상표 데이터 테스트 api', path='')

CORS(app) # 다른 포트번호에 대한 보안 제거

parser = reqparse.RequestParser()

# db 연동
host = "mongo_db" # 단독실행시 localhost / docker실행시 mongo_db
port = "27017"
conn = MongoClient(host, int(port))

# db 생성
db = conn.vitaminc

# collection 생성
collect = db.trademark
collect_elastic = db.sampledata

# api 구현
@ns.route('/api')
class index(Resource):
    def get(self):
        return "Hello World!"

@ns.route('/api/show_data')
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
        return s

@ns.route('/api/data_transmit')
class saveTrademark(Resource):
    parser.add_argument('title',type=str, default='', help='상표명')
    parser.add_argument('code',type=str, default='', help='유사군코드')

    @ns.expect(parser)
    @ns.response(201,'success')
    @ns.response(400,'bad request')
    @ns.response(500,'server error')

    def post(self):
        args = parser.parse_args()
        title = args['title']
        code = args['code']
        
        results = collect.find_one({"title":title, "code":code})

        if results != None: # 아예 중복되는 데이터가 있는 경우
            print(results)
            return jsonify({
                "status": 201,
                "success": True,
                "results": str(results),
                "message": "데이터 등록 성공"
            })
                
        else: # 중복 없으면 insert
            mongo_res = collect_elastic.find({'similar_group':{"$eq": code}})
            sim_titles, scores = search_similar_text(title, mongo_res, code)
            doc = {
            "title" : title,
            "code" : code,
            'similar_titles': sim_titles,
            'scores' : scores
            }

            collect.insert(doc)

            return jsonify({
                "status": 201,
                "success": True,
                "results": {
                    "title" : title,
                    "code" : code,
                    'similar_titles': sim_titles,
                    'scores' : scores
                },
                "message": "데이터 등록 성공"
            })