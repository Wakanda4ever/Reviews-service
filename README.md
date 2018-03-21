# Reviews-service
Yelp Clone - Reviews Service

## Build

Then open a mongodb tab to the db IP
```
$ mongo --host 127.0.0.1:27017
$ git clone https://github.com/Wakanda4ever/Reviews-service.git
$ cd Reviews-service
$ npm install && npm start
$ npm test #runs enzyme, jest tests from terminal
$ docker build -t ch3ck/reviews-service . 
$ docker compose up --build
```

## Deploy

Open the browser to the following url: http://localhost:3004/reviews/${id}

*${id}* corresponds to the current item Id.

## Feedback
Project is based on the work of [Mike Guin](https://github.com/guinzar) and I'm stress testing this application making it scalable to handle up to 10M requests per second.