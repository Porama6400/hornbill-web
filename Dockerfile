FROM node:22-alpine as builder
RUN corepack enable

WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

COPY . .
RUN pnpm build

FROM nginx:1.27-alpine
RUN apk update --no-cache && apk upgrade openssl libssl3 libcrypto3 curl libcurl
COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
