FROM node

RUN apt-get update && \
    apt-get install -y sudo nano build-essential python && \
    npm i -g nodemon
