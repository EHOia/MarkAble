from elasticsearch import helpers, Elasticsearch
from langdetect import detect
import json

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

def search_similar_text(query_title, similar_group):
    
    es = Elasticsearch('elasticsearch:9200')
    if not es.indices.exists(index='trademark'):  # Elasticsearch 내부에 db가 존재하지않으면 insert
        es.indices.create(index='trademark', body=settings)        
        with open('./2020_data.json', 'r') as file:
            data = json.load(file)    
        helpers.bulk(es, actions=data, index='trademark')
        es.indices.refresh()
    
    if detect(query_title) == 'ko':
        tokenizer = 'title.nori'
    else:
        tokenizer = 'title'
        
    body = {
      "query": {
        "bool" : {
          "must": [
              {
                  "multi_match": {
                      "query": query_title,
                      "fuzziness": "auto",
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
    meta_data = []
    for match in res['hits']['hits']:
        score.append(match['_score'])
        meta_data.append(match['_source'])
        
    return score, meta_data
