FROM node:alpine as builder
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN sh ./scripts/build.sh

# --------------

FROM node:alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 9556

CMD [ "node", "dist/index.js" ]
