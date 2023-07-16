FROM node:16-alpine

WORKDIR /app

COPY package.json /app

RUN npm i --silent --omit=dev

COPY . /app

RUN npm run build

RUN npm run db:migrate

RUN npm run db:seed

EXPOSE 3000

CMD ["node", "dist/src/main"]
