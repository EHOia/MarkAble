from flask import Flask, json, jsonify, request, Response
from flask_restx.utils import default_id  # 서버 구현을 위한 Flask 객체 import
from pymongo import MongoClient
from flask_restx import reqparse, Api, Resource, fields  # Api 구현을 위한 Api 객체 import
from flask_cors import CORS

app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
api = Api(app)  # Flask 객체에 Api 객체 등록

CORS(app)

parser = reqparse.RequestParser()

# db 연동
host = "mongo_db" #도커로 실행할 때와 로컬로 단독 실행할 때 다르다! (변경해주어야함)
port = "27017"
conn = MongoClient(host, int(port))

# db 생성
db = conn.vitaminc

# collection 생성
collect = db.trademark
collect2 = db.ai

#api 구현 
@api.route('/api')
class index(Resource):
    def get(self):
        return "Hello World!"

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

        print(title,category)
        # document 생성 
        doc = {
            "title" : title,
            "category" : category
        }

        collect.insert(doc)

        return jsonify({
            "status": 201,
            "success": True,
            "message": "테이블 등록"
        })
        