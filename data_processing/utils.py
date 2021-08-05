import pandas as pd
import numpy as np
from tqdm import tqdm
import warnings
from pandas.core.common import SettingWithCopyWarning
pd.set_option('mode.chained_assignment',  None)

def make_dic(enroll_num, title, category, similar_group, enroll_statement):
    return {
            'enroll_num':enroll_num,
            'title': title,
            'category': category,
            'similar_group': similar_group,
            'enroll_statement': enroll_statement
            }
    
def apply_fn(x, y):
    if x != '' and type(x) == str:
        return x
    elif y != '' and type(y) == str:
        return y
    else:
        return 0
      
def map_fn(x):
    try:
        return x[1:]
    except:
        return np.nan
      
def data_preprocessing(kt_10_path, kt_15_path, from_date='20150101', to_date='20201231'):
  # TB_KT10 데이터 로드 및 전처리
  use_col = ['출원번호', 'B출원일자', 'B상표한글명', 'B상표영문명', 'B법적상태']
  col_name = ['출원번호', '출원일자', '상표한글명', '상표영문명', '법적상태']
  csv = pd.read_csv(kt_10_path, sep='^', usecols=use_col)
  csv['B출원일자'] = csv['B출원일자'].map(lambda x: x[1:])
  csv.columns = col_name
  
  # 사용할 날짜안에 들어있는 데이터만사용.
  csv = csv.query('(출원일자 >=@from_date) and (출원일자<=@to_date)')

  # 데이터 전처리
  csv['상표한글명'] = csv['상표한글명'].map(lambda x: map_fn(x))
  csv['법적상태'] = csv['법적상태'].map(lambda x: map_fn(x))
  csv['상표영문명'] = csv['상표영문명'].map(lambda x: map_fn(x))
  csv = csv.sort_values('출원일자')
  state_ls = ['등록', '출원', '거절', '포기']
  csv_10 = csv.query('법적상태 in @state_ls')
  
  # TB_KT15 데이터 로드 및 전처리
  use_col = ['출원번호', 'B류', 'B지정상품한글명', 'B지정상품영문명', 'B유사군']
  col_name = ['출원번호', '류', '지정상품한글명', '지정상품영문명', '유사군']
  csv_15 = pd.read_csv(kt_15_path, sep='^', usecols=use_col)
  csv_15.columns = col_name
  csv_15['류'] = csv_15['류'].map(lambda x: map_fn(x))
  csv_15['지정상품한글명'] = csv_15['지정상품한글명'].map(lambda x: map_fn(x))
  csv_15['지정상품영문명'] = csv_15['지정상품영문명'].map(lambda x: map_fn(x))
  csv_15['유사군'] = csv_15['유사군'].map(lambda x: map_fn(x))
  csv_15 = csv_15[csv_15['유사군'] != ' ']
  csv_15 = csv_15[csv_15['출원번호'].isin(csv['출원번호'])]
  return csv_10, csv_15

def make_data(csv_10, csv_15):
  csv_10 = csv_10.sort_values(by=['출원번호'], axis=0)
  csv_10 = csv_10.reset_index(drop=True)
  csv_10['유사군'] = np.nan
  csv_10['류'] = np.nan
  
  csv_15 = csv_15.sort_values(by=['출원번호'], axis=0)
  csv_15 = csv_15[csv_15.index.isin(csv_15['류'].dropna().index)]
  csv_15 = csv_15[csv_15['류'] != ' ']
  csv_15['류'] = csv_15['류'].astype(int)
  csv_15 = csv_15.reset_index(drop=True)
  
  csv_10 = csv_10[csv_10['출원번호'].isin(list(csv_15['출원번호'].value_counts().index))]
  for i in tqdm(csv_10.index):
    valid_csv = csv_15[csv_15['출원번호'] == csv_10['출원번호'][i]]
    similar_code = list(valid_csv['유사군'].value_counts().index)
    category = list(valid_csv['류'].astype(str).value_counts().index)
    csv_10['류'].loc[i] = ','.join(category)
    csv_10['유사군'].loc[i] = ','.join(similar_code)
  csv_10['상표이름'] = csv_10.apply(lambda x: apply_fn(x['상표한글명'], x['상표영문명']), axis=1)
  csv_final = csv_10[csv_10['상표이름'] != 0]
  return csv_final