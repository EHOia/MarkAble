FROM mongo

WORKDIR /temp
COPY data.json /temp
CMD mongoimport --host mongo_db --db vitaminc --collection year_data --type json --file /temp/data.json --jsonArray
