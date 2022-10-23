FROM node:16.13.2-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/