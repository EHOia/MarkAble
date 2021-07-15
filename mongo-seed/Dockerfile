FROM mongo

WORKDIR /temp
COPY sample.json /temp
CMD mongoimport --host mongo_db --db vitaminc --collection sampledata --type json --file /temp/sample.json --jsonArray