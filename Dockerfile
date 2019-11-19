FROM node:latest

EXPOSE 3001

COPY . /usr/src/app/docker-node-mongo

WORKDIR /usr/src/app/docker-node-mongo

COPY package.json /usr/src/app/docker-node-mongo/

RUN npm install

CMD ["npm", "start"]