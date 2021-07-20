from elasticsearch import Elasticsearch
from langdetect import detect

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
    #   "enroll_statement":{
    #     "type": "keyword",
    #   }
    }
  }
}

def search_similar_text(query_title, mongo_res, code):
    
    index_name = code.lower()
    es = Elasticsearch('elasticsearch:9200')
    if not es.indices.exists(index=index_name):
        es.indices.create(index=index_name, body=settings)
        for hit in mongo_res:
            es.index(index=index_name, body={'title':hit['title'],
                                        'enroll_num':hit['enroll_num'],
                                        'category':hit['category'],
                                        'similar_group':hit['similar_group']})
        es.indices.refresh()
    
    if detect(query_title) == 'ko':
        tokenizer = 'title.nori'
    else:
        tokenizer = 'title'
        
    body = {
        'query': {
            "multi_match":{
                'query':  query_title,
                'fields': [tokenizer]
            }
        }
    }
    res = es.search(index=index_name, body=body)
    
    score = []
    meta_data = []
    for match in res['hits']['hits']:
        score.append(match['_score'])
        meta_data.append(match['_source'])
        
    return score, meta_data
