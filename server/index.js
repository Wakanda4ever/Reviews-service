var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var controller = require('./controllers');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../dist'));

app.get('/reviews/reviews/:id', controller.reviews.get);
app.get('/reviews/user/:id', controller.user.get);
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});
app.listen(3004, function() {
  console.log('listening on port 3004');
});
