FROM node:18-alpine as development

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

FROM development as production

ENV NODE_PATH=./dist

RUN yarn build

LABEL "maintainer"="thuongtruong1009 <thuongtruongofficial@gmail.com>"
LABEL "org.opencontainers.image.authors"="Thuong Truong <"
LABEL "org.opencontainers.image.version"="1.0"
LABEL "org.opencontainers.image.description"="Official Docker Image of Boarder API application"
LABEL "org.opencontainers.image.licenses"="MIT"
LABEL "org.opencontainers.image.source"="https://github.com/thuongtruong1009/boarder/server"
LABEL "org.opencontainers.image.documentation"="https://thuongtruong1009.github.io/api-docs"
