FROM node:18-alpine as build-stage

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

FROM node:18-alpine as production-stage

WORKDIR /app

RUN chown -R node:node /app

USER node

RUN mkdir dist

COPY --chown=node:node ./package.json ./yarn.lock ./

COPY --chown=node:node --from=build-stage /app/dist /app/dist

RUN yarn --production
