FROM node:latest

COPY . /usr/src/app/docker-node-mongo

WORKDIR /usr/src/app/docker-node-mongo

COPY package.json /usr/src/app/docker-node-mongo/

RUN yarn install

CMD yarn dev