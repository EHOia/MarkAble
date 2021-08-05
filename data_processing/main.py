import pandas as pd
import numpy as np
from utils import *
import json

kt_10_path = '/mnt/hdd/spow12/TB_KT10.txt' # kt_10.txt파일 경로정의
kt_15_path = '/mnt/hdd/spow12/TB_KT15.txt' # kt_15.txt파일 경로정의

csv_10, csv_15 = data_preprocessing(kt_10_path, kt_15_path, from_date='20201001', to_date='20201231')
csv_final = make_data(csv_10, csv_15)

db_dic = csv_final.apply(lambda x: make_dic(x['출원번호'], 
                                      x['상표이름'],x['류'], 
                                      x['유사군'], x['법적상태']), axis=1).to_list()

with open("./../mongo-seed/data.json", "w") as json_file:
    json.dump(db_dic, json_file)