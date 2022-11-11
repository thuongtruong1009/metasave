FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN chown -R node:node /app

USER node

COPY --chown=node:node ./package.json ./yarn.lock ./tsconfig.json ./

EXPOSE 3000

CMD ["yarn", "start"]