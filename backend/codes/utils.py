from elasticsearch import helpers, Elasticsearch
from langdetect import detect
import json
import requests
import xmltodict
from wordcloud import WordCloud
import boto3
from time import localtime, strftime
import os
# import matplotlib.pyplot as plt

# Define mapping
settings = {
  "settings": {
    "index": {
      "similarity": {
        "my_similarity": {
          "type": "BM25"
        }
      }
    },
    "analysis" :{
        "analyzer":{
            "nori": {
                "tokenizer" : "nori_tokenizer"
            }
        }
    },
  },
"mappings": {
    "properties": {
      "title": {
        "type": "text",
        "similarity": "my_similarity",
        "fields" : {
            "nori":{
                "type" : "text",
                "analyzer": "nori"
            },
            "english": {
              "type": "text",
              "analyzer": "english"
            }
        }
      },
      "category":{
        "type":"text"   
      },
      "similar_group": {
        "type": "text",
      },
      "enroll_num":{
        "type": "keyword",
      },
      "enroll_statement":{
        "type": "keyword",
      }
    }
  }
}

def make_cloud_image(tags, file_path='image.png', font_path='NanumGothic.ttf'):
    if os.path.isfile(file_path):
        os.remove(file_path)
     # 만들고자 하는 워드 클라우드의 기본 설정을 진행합니다.
    word_cloud = WordCloud(
        font_path=font_path,
        width=800,
        height=800,
        background_color="white",
    )
    # 추출된 단어 빈도수 목록을 이용해 워드 클라우드 객체를 초기화 합니다.
    word_cloud = word_cloud.generate_from_frequencies(tags)
    word_cloud.to_file(file_path)

def upload_s3_image(access_key, secret_key, image_path='image.png', location='ap-northeast-2'):
  s3 = boto3.resource(
  service_name='s3',
  region_name=location,
  aws_access_key_id=access_key,
  aws_secret_access_key=secret_key
  )
  bucket_name = 'trademark-images-db'
  upload_time = strftime("%Y_%m_%d_%H:%M:%S", localtime())
  key_name = 'wordcloud/' + upload_time + '_image.png'
  s3.Bucket(bucket_name).upload_file(Filename=image_path, Key=key_name)
  url = "https://s3-%s.amazonaws.com/%s/%s"%(location, bucket_name, key_name)
  return url
  

def es_load_data(mongo_res): # elasticsearch data_load using json
  es = Elasticsearch('elasticsearch:9200')
  if not es.indices.exists(index='trademark'):  # Elasticsearch 내부에 db가 존재하지않으면 insert
    es.indices.create(index='trademark', body=settings)
    helpers.bulk(es, actions=mongo_res, index='trademark')
    es.indices.refresh()
    
def search_similar_text(query_title, similar_group):
    
  es = Elasticsearch('elasticsearch:9200')
  
  if detect(query_title) == 'ko':
      tokenizer = 'title.nori'
  else:
      tokenizer = 'title'
        
  body = {
    'size': '50',
    "query": {
      "bool" : {
        "must": [
            {
                "multi_match": {
                    "query": query_title,
                    "fuzziness": "1",
                    'fields':[
                        tokenizer, similar_group
                    ]
                }
            },
            {
                'match': {
                    'similar_group': similar_group
                }
            }

        ],
      }
    }
  }
  res = es.search(index='trademark', body=body)
  score = []
  es_score = []
  meta_data = []
  for idx, match in enumerate(res['hits']['hits']):
    if idx <= 4:
      score.append(match['_score'])
      meta_data.append(match['_source'])
    es_score.append((match['_source']['title'],match['_score']))

  return score, meta_data , es_score

def get_assignprodcut_dict(product_name, your_api_key):
  url1 = "http://plus.kipris.or.kr" \
       "/openapi/rest/trademarkInfoSearchService/trademarkAsignProductSearchInfo"
  searchword = product_name
  url2 = "?searchWord=" + searchword
  url3 = "&accessKey="+your_api_key
  reponse = requests.get(url1+url2+url3)
  content = reponse.content
  dict_type = xmltodict.parse(content)
  body = dict_type['response']['body']
  return [{'name': x['name'], 'similiar_code':x['simm'],'category':x['classsification']}for x in body['items']['trademarkAsignProductSearchInfo']] 