# Base image
FROM tensorflow/tensorflow:2.4.1

WORKDIR /usr/src/app
# upgrade pip
RUN pip install --upgrade pip

# install Python modules needed by the Python app
COPY /AI/requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt
RUN pip install --upgrade tensorflow-hub
Run pip install -U tensorflow-text==2.4.1

# tell the port number the container should expose
EXPOSE 8887

CMD ["python", "calculate_sim.py"]