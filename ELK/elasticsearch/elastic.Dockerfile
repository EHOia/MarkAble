FROM docker.elastic.co/elasticsearch/elasticsearch:7.13.2
EXPOSE 9200
EXPOSE 9300
# Example: RUN elasticsearch-plugin install analysis-icu

RUN elasticsearch-plugin install analysis-nori
