from elasticsearch import helpers, Elasticsearch
from langdetect import detect
import json
import requests
import xmltodict

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

# def es_load_data(): # elasticsearch data_load using json
#   es = Elasticsearch('elasticsearch:9200')
#   if not es.indices.exists(index='trademark'):  # Elasticsearch 내부에 db가 존재하지않으면 insert
#     es.indices.create(index='trademark', body=settings)        
#     with open('./2020_data.json', 'r') as file:
#         data = json.load(file)    
#     helpers.bulk(es, actions=data, index='trademark')
#     es.indices.refresh()

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
    'size': '5',
    "query": {
      "bool" : {
        "must": [
            {
                "multi_match": {
                    "query": query_title,
                    "fuzziness": "1",
                    'fields':[
                        tokenizer
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
  for match in res['hits']['hits']:
    score.append(match['_score'])
    es_score.append((match['_source']['title'],match['_score']))
    meta_data.append(match['_source'])


  doc = {
    "data_info":meta_data,
  }

  if not es.indices.exists(index='subdata'):  # Elasticsearch 내부에 db가 존재하지않으면 insert
    es.indices.create(index='subdata')
  es.delete_by_query(index='subdata', doc_type="_doc", body='{"query":{"match_all":{}}}')
  es.index(index='subdata',body=doc)
  es.indices.refresh(index='subdata')
  #인덱스 내부 전체 doc 제거 es.delete_by_query(index='subdata', doc_type="_doc", body='{"query":{"match_all":{}}}')

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