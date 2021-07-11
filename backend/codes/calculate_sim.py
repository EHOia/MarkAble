import tensorflow_hub as hub
import tensorflow as tf
import numpy as np
import tensorflow_text
import pandas as pd
from wordcloud import WordCloud
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt

# Embedding 모델 읽어오기
module_url = 'https://tfhub.dev/google/universal-sentence-encoder-multilingual/3'
model = hub.load(module_url)
# 이부분을 FrontEnd에서 읽어오는것으로 바꿔야함
query_text = '삼성'
query_text_emb = model(query_text)

# 이 부분을 DB에서 읽어오는것으로 바꿔야함
# 지금은 이 코드에서 벡터화하고있지만, DB에서 미리 벡터화된 데이터를 읽어와야함.
db_data = ['쿠팡', '테슬라', '애플', '삼성전자']
emb_texts = model(db_data)

# 유사도 계산
cos_sim = cosine_similarity(query_text_emb, emb_texts).reshape(-1, 1)

# word cloud를 위해 유사도를 자연수로 변환
dic = {}
for title, vec in zip(db_data, cos_sim):
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