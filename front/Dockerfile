FROM node:lts-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci --no-audit

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "serve", "-s", "dist", "-p", "8080" ]