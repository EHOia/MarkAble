FROM mongo

WORKDIR /temp
COPY 2020_data.json /temp
CMD mongoimport --host mongo_db --db vitaminc --collection year_data --type json --file /temp/2020_data.json --jsonArray