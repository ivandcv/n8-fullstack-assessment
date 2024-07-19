FROM node:lts-slim AS builder

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build

# Serve the built application
FROM node:lts-slim

WORKDIR /app

RUN npm i -g serve

COPY --from=builder /app/dist /app

EXPOSE 8080

CMD ["serve", "-s", ".", "-l", "8080"]