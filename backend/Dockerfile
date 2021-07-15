# Base image
FROM ubuntu:20.04

WORKDIR /usr/src/app

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
RUN pip3 install flask-restx
RUN pip3 install pymongo
RUN pip3 install flask_cors


# tell the port number the container should expose
EXPOSE 5000

#CMD ["python", "calculate_sim.py"]
CMD [ "python3", "app.py" ]