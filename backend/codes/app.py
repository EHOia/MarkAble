from flask import Flask, jsonify, Response
from pymongo import MongoClient
from flask_restx import reqparse, Api, Resource # Api 구현을 위한 Api 객체 import
from flask_cors import CORS
from elastic_func import search_similar_text
from prometheus_flask_exporter import PrometheusMetrics 
from prometheus_client import Counter, Histogram # 사용할 타입 import 
import prometheus_client
import time 

app = Flask(__name__) # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
metrics = PrometheusMetrics(app)
metrics.info("flask_app_info", "App Info, this can be anything you want", version="1.0.0")
app.config['JSON_AS_ASCII'] = False

graphs = {}
graphs['c'] = Counter('python_request_operations_total','The total number of processed requests')
graphs['h'] = Histogram('python_request_duration_seconds','Histogram for the duration in seconds', buckets=(1,2,5,6,10,float('inf')))

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

# prometheus counter 
@app.route("/metrics")
def requests_count():
    res = []
    for k,v in graphs.items():
        res.append(prometheus_client.generate_latest(v))
    return Response(res, mimetype="text/plain")

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
        start = time.time()
        graphs['c'].inc()

        time.sleep(0.500)
        end = time.time()
        graphs['h'].observe(end-start)

        args = parser.parse_args()
        title = args['title']
        code = args['code']
        
        results = collect.find_one({"query_title":title, "code":code})

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
            score, meta_data = search_similar_text(title, mongo_res, code)
            doc = {
            "query_title" : title,
            "code" : code,
            'score' : score,
            'meta_data' : meta_data
            }

            collect.insert(doc)

            return jsonify({
                "status": 201,
                "success": True,
                "results": {
                    "query_title" : title,
                    "code" : code,
                    'score' : score,
                    'meta_data' : meta_data
                },
                "message": "데이터 등록 성공"
            })