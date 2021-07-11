# Base image
FROM tensorflow/tensorflow:2.4.1

WORKDIR /usr/src/app
# upgrade pip

RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev \
    build-essential libssl-dev libffi-dev python3-setuptools \
    python3-venv mongodb-clients

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

RUN pip install --upgrade pip

# install Python modules needed by the Python app
COPY /backend/requirements.txt /usr/src/app
RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt
RUN pip install --upgrade tensorflow-hub
Run pip install -U tensorflow-text==2.4.1
RUN pip3 install flask-restx
RUN pip3 install pymongo
RUN pip3 install flask_cors


# tell the port number the container should expose
EXPOSE 5000

CMD ["python", "calculate_sim.py"]
CMD [ "python3", "app.py" ]