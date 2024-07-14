FROM node:lts-slim

WORKDIR /app

COPY package*.json .
COPY package-lock.json .

RUN npm ci --no-audit

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]