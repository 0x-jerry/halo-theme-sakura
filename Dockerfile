FROM node:alpine as builder-client

WORKDIR /app

COPY client/package.json client/yarn.lock ./

RUN yarn --frozen-lockfile

COPY client .

RUN yarn build

# -----------------

FROM node:alpine as builder-server

WORKDIR /app

COPY server/package.json server/yarn.lock ./

RUN yarn --frozen-lockfile

COPY server .

RUN yarn build

# --------------

FROM node:alpine

WORKDIR /app

ENV NODE_ENV=production

COPY server/package.json server/yarn.lock ./

RUN yarn --frozen-lockfile

COPY --from=builder-server /app/dist ./dist
COPY --from=builder-client /app/dist ./dist/client

EXPOSE 9556

CMD [ "node", "dist/index.js" ]
