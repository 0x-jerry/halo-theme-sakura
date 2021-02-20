FROM node:alpine

WORKDIR /app


COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY .nuxt .nuxt
COPY dist/ ./
COPY client/static client/static

EXPOSE 9556

ENV NODE_ENV=production

CMD [ "node", "server/index.js" ]
