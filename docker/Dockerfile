FROM node:18-alpine as development

WORKDIR /app

COPY /server .

RUN yarn install

RUN yarn build

FROM development as production

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY --chown=node:node /server/package.json /server/yarn.lock ./

COPY --chown=node:node --from=development /app/dist /app/dist

RUN npx yarn install --production

LABEL "maintainer"="thuongtruong1009 <thuongtruongofficial@gmail.com>"
LABEL "org.opencontainers.image.authors"="Thuong Truong <"
LABEL "org.opencontainers.image.version"="1.0"
LABEL "org.opencontainers.image.description"="Official Docker Image of Metasave API application"
LABEL "org.opencontainers.image.licenses"="MIT"
LABEL "org.opencontainers.image.source"="https://github.com/thuongtruong1009/metasave/server"
LABEL "org.opencontainers.image.documentation"="https://thuongtruong1009.github.io/docs"