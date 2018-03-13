FROM node:9.4.0

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3004

CMD [ "npm", "start"]