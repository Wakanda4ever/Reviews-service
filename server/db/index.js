var mysql = require('mysql');

var con = mysql.createConnection({
  host: "ec2-user@ec2-54-175-103-213.compute-1.amazonaws.com",
  user: "host",
  database: "yelpdataset",
  password: "developer"
});

// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'yelp_db'
// });

con.connect(function(err) {
  if (err) {
    console.log('oh no error db connect');
  }
  console.log('Connected!');
});

module.exports = con;