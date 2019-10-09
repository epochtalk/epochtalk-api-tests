FROM node:12.10.0

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean --force

COPY . /usr/src/app

CMD yarn run test
EXPOSE 1025
