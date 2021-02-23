FROM node:alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build && \
  cp -r .nuxt dist/.nuxt && \
  mkdir dist/client && \
  cp -r client/static dist/client/static


FROM node:alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn

COPY --from=builder /app/dist ./

EXPOSE 9556

CMD [ "node", "server/index.js" ]
