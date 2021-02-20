FROM node:12

WORKDIR /app


COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY .nuxt .nuxt
COPY dist/ ./

EXPOSE 9556

ENV NODE_ENV=production

CMD [ "node", "server/index.js" ]
