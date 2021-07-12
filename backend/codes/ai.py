import numpy as np
import pandas as pd
from wordcloud import WordCloud
from sklearn.metrics.pairwise import cosine_similarity

def cal_similarity(model, query_text, word_cloud=False, top_k=5):
    """
    model: embbeding 모델
    query_text: frontend에서 받아온 상표 이름,           type-> string
    word_cloud: word_cloud를 그릴지 결정하는 변수   type-> bool
    top_k: 가장 유사도가 높은 k개만 저장.           type-> int
    """
    # 이부분을 FrontEnd에서 읽어오는것으로 바꿔야함
    query_text_emb = model(query_text)
    # 이 부분을 DB에서 읽어오는것으로 바꿔야함
    # 지금은 이 코드에서 벡터화하고있지만, DB에서 미리 벡터화된 데이터를 읽어와야함.
    db_data = ['쿠팡', '테슬라', '애플', '삼성전자', '카카오', '현대', 'SK 텔레콤']
    emb_texts = model(db_data)

    # 유사도 계산
    cos_sim = cosine_similarity(query_text_emb, emb_texts).ravel()
    sorted_idx = (-cos_sim).argsort()[:top_k]
    
    top_k_sim = list(map(lambda x: float(x), list(cos_sim[sorted_idx])))
    top_k_title = [db_data[i] for i in sorted_idx]
    
    # word cloud를 위해 유사도를 자연수로 변환
    if word_cloud:
        wordcloud = make_wordcloud(db_data, cos_sim)
    else:
        wordcloud = None
    return top_k_sim, top_k_title, wordcloud   

def make_wordcloud(db_text, cos_sim):
    """
    db_text: db에 저장되어있는 상표 이름들,         type-> list
    cos_sim: db_text, query_text간의 유사도.        type-> list
    
    이때, db_text, cos_sim의 동일한 인덱스가 가리키는 상표이름은 동일해야함
    """
    dic = {}
    for title, vec in zip(db_text, cos_sim):
        if vec >= 0:
            dic[title] = int(vec*1000)

    # WordCloud 만들기
    # 폰트지정을 하지않으면 한글이 나오지않음.
    font_path = './NanumBarunGothic.ttf'
    wordcloud = WordCloud(
        background_color="white",
        font_path = font_path,
        width = 800,
        height = 800
    )
    wordcloud = wordcloud.generate_from_frequencies(dic)
    return wordcloud