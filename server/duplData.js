var db = require('./db');
var Promise = require('bluebird');
var fs = require('fs');
//const file = fs.createWriteStream('./data.csv');

var newdb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'yelp_dup'
});


newdb.connect(function(err) {
  if (err) {
    console.log('Cant connect to new db');
  }
});

var beginSeed = Date.now();

var doubleDataSet = function() {
  for (let i = 0; i < 10000000; i += 100) {
    var query = `select * from review limit 100 offset ${i}`;
    db.query(query, (err, res) => {
      if (err) {
        console.error('Error reading reviews from database');
        return -1;
      } else {
        for (let j = 0; j < res.length; i++) {
          var sql = 'INSERT INTO REVIEW (id, business_id, user_id, stars, date, text, useful, funny, cool) values(' + i + ',' + res[i].business_id + ',' + res[i].user_id + ',' + res[i].stars + ',' + res[i].date + ',' + res[i].text + ',' + res[i].useful + ',' + res[i].funny + ',' + res[i].cool + ')';
          console.log('SQL: ', sql);
          // newdb.query(sql, (err, result) => {
          //   if (err) {
          //    console.error('Error writing data', err);
          //   } else {
          //    console.log(i, 'element inserted');
          //   }
          // });
        }
      }
    });
  }
};

doubleDataSet();
var endSeed = Date.now();
console.log('Time Diff: ', endSeed, beginSeed);