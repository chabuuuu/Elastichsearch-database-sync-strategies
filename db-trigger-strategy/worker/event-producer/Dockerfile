FROM node:21-alpine3.19

RUN mkdir -p /opt/app

WORKDIR /opt/app

ENV database=employee_db
ENV user=postgres
ENV password=pgadmin
ENV port=5432
ENV KAFKA_BROKER=kafka-trigger-strategy:9092
ENV host=postgres-trigger-strategy

RUN npm i npm@latest -g

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]