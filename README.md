# 상표 출원 가능성 예측 서비스 
<br>

## **1️⃣  프로젝트 소개**

상품명칭을 검색해 **유사군코드**를 구한 후 **상표명**을 **입력**했을 때, 같은 상품의 상표명 데이터 내에서 **유사도가 높게 나타나는 상표명들**과 **가장 높은 유사도 확률**을 확인해 원하는 상표명이 출원 가능한지 판단할 수 있는 웹 서비스를 구축한다. 

<br>

## **2️⃣  System Architecture**

![image](https://user-images.githubusercontent.com/75110752/126993976-ae09d297-ee7b-42a0-96c3-db51bde60239.png)
## **3️⃣  Tech Stack**
| frontend                                                                                                                                                                                                                   | backend                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | etc                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <img src="https://img.shields.io/badge/React-92CAFB?style=flat-square&logo=React&logoColor=white"/></a>  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a> </br> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a> <img src="https://img.shields.io/badge/Axios-AE68D1?style=flat-square&logo=Axios&logoColor=white"/></a> | <img src="https://img.shields.io/badge/Python-3766AB?style=flat-square&logo=Python&logoColor=white"/></a> <img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=Flask&logoColor=white"/></a> </br> <img src="https://img.shields.io/badge/Elasticsearch-005571?style=flat-square&logo=Elasticsearch&logoColor=white"/></a> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/></a> <img src="https://img.shields.io/badge/Gunicorn-A1DCDA?style=flat-square&logo=Gunicorn&logoColor=white"/></a> | <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> </br><img src="https://img.shields.io/badge/S3-569A31?style=flat-square&logo=Amazon S3&logoColor=white"/> <img src="https://img.shields.io/badge/EC2-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"/> <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=Swagger&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white"/> </br> <img src="https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=Prometheus&logoColor=white"/> <img src="https://img.shields.io/badge/Grafana-F46800?style=flat-square&logo=Grafana&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/> </br>  <img src="https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/> <img src="https://img.shields.io/badge/Ubuntu 20.04-E95420?style=flat-square&logo=Ubuntu&logoColor=white"/></a> </br>

## **4️⃣  설치**

a. 도커 설치.

[공식 사이트](https://docs.docker.com/engine/install/)의 가이드를 따라서 도커를 설치한다.

b. 이 Repository를 Clone 한다.
```shell
git clone https://github.com/2021-summer-program/Trademark_verification
```
c. Kipris API KEY 세팅.

1. 회원가입을 통해 API키 발급.
2. [이 사이트](https://plus.kipris.or.kr/portal/bbs/view.do?bbsId=B0000004&nttId=683&menuNo=200019)를 참조하여 API 활용 신청.
3. [kipris plus](https://plus.kipris.or.kr/portal/main.do) 메인페이지 데이터서비스 -> OpenAPI -> 상표출원속보 API 신청
4. backend/codes/api_key.txt 파일생성후, api_key.txt에 본인의 REST API KEY 복사해서 붙여넣기.

d. 빌드

docker-compose.yml 파일이있는 폴더(root 폴더)에서 다음을 실행
```shell
docker-compose build
```

## **5️⃣  실행**

docker-compose.yml 파일이있는 폴더(root 폴더)에서 다음을 실행

```shell
docker-compose up
```

**컨테이너별 Port들** 

Tool | port |
--- | --- | 
ElasticSearch | 9200 |
Frontend | 3000 |
Backend | 5000 |
Prometheus | 9090 |
Grafana | 3001 |
      
실행이후 컨테이너 삭제

```shell
docker-compose down
```
