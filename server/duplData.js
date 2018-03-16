var db = require('../db');
var Promise = require('bluebird');
var fs = require('fs');


var beginSeed = Date.now();

var doubleDataSet = function() {
  var query = `select * from review`;
  db.query(query, (err, res) => {
    if (err) {
      console.error('Error reading reviews from database');
      return -1;
    } else {
      for (let i = 0, j = 0; i < 10000000 && j < res.length; i++, j++) {
         if (j === res.length - 1) {
            j = 0;
         }
         var sql = 'INSERT INTO REVIEW (id, business_id, user_id, stars, date, text, useful, funny, cool) values(' + i + ',' + res.[i].business_id + ',' + res.[i].user_id + ',' + res.[i].stars + ',' + res.[i].date + ',' + res.[i].text + ',' + res.[i].useful + ',' + res.[i].funny + ',' + res.[i].cool + ')';
         db.query(sql, (err, result) => {
           if (err) {
            console.error('Error writing data', err);
           } else {
            console.log(i, 'element inserted');
           }
         });
      }
    }
  });
};

doubleDataSet();
var bendSeed = Date.now();