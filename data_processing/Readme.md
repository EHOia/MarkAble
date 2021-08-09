# About this Folder

Markable을 위한 데이터 프로세싱 파이프라인.

## Installation
### Requirements

- Linux(Recommand)
- Python 3.6+
- Anaconda environment(Recommand)

a. Create a conda virtual environment and activate it.

```shell
conda create -n markable python=3.6
conda activate markable
```

b. Install requirments.

```shell
pip install -r requirements.txt
```

c. Download Data from kipris and setting.

1. [KIPRIS Plus 웹사이트](https://plus.kipris.or.kr/portal/bbs/view.do?bbsId=B0000004&nttId=683&menuNo=200019) 접속
2. 마이페이지 -> 다운로드 관리 -> BULK(기간제) -> 상표공보(서지) -> 2020 -> back_20201231(TB_KT15), back_20201231(TB_KT10) 다운로드
3. 압축해제이후 각각 파일의 경로를 main.py에 설정.
4. main.py의 data_preprocssing함수의 from_date, to_date를 원하는 기간으로 설정 EX) from_date: 20190101, to_date 20201231


d. Run pipeline.
```shell
python main.py
```
Mongo-seed폴더에 data.json파일로 데이터가 나오는지 확인.
