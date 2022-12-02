FROM node:18-alpine as development

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

FROM development as production

ENV NODE_PATH=./dist

RUN yarn build
