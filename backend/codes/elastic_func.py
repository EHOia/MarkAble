import pickle
import elasticsearch_dsl as dsl
from elasticsearch import Elasticsearch

with open('./setting.pckl', 'rb') as fil:
    mapping = pickle.load(fil)

def search_similar_text(query_title, mongo_res, code):
    
    index_name = code.lower()
    es = Elasticsearch('elasticsearch:9200')
    if not es.indices.exists(index=index_name):
        es.indices.create(index=index_name, body=mapping)
        for hit in mongo_res:
            es.index(index=index_name, body={'title':hit['title'],
                                        'enroll_num':hit['enroll_num'],
                                        'category':hit['category'],
                                        'similar_group':hit['similar_group']})
        es.indices.refresh()
    
    S = dsl.Search(using=es, index=index_name)
    s = S.query(
        'multi_match',
        query=query_title,
        fuzziness='auto',
        fields=['title']
    )
    
    sim_titles = []
    scores = []
    for match in s.execute():
        sim_titles.append(match.title)
        scores.append(match.meta.score)
        
    return sim_titles, scores

