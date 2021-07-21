# base image 
FROM node 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY frontend/package.json /usr/src/app

RUN npm install
RUN npm install axios
RUN npm i -S @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
COPY frontend/ /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]