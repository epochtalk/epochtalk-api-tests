FROM node:7.10.0

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force

COPY . /usr/src/app

CMD npm run test
EXPOSE 1025
