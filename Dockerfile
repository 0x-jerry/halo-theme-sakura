FROM node:alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn

COPY dist/ ./

EXPOSE 9556

CMD [ "node", "server/index.js" ]
