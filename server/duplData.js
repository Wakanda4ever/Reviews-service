var mysql = require('mysql2');
var Promise = require('bluebird');
var fs = require('fs');
const Sequelize = require("sequelize");

//const file = fs.createWriteStream('./data.csv');
const db = new Sequelize("yelp_db", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

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

// var doubleDataSet = function() {

//   var query = `select * from review`;
//   db.query(query, (err, res) => {
//     if (err) {
//       console.error('Error reading reviews from database');
//       return -1;
//     } else {
//       console.log(res.length);
//       // for (let i = 0, j = 0; i < 10000000 && j < res.length; i++, j++) {
//       //    if (j === res.length - 1) {
//       //       j = 0;
//       //    }
//       //    var sql = 'INSERT INTO REVIEW (id, business_id, user_id, stars, date, text, useful, funny, cool) values(' + i + ',' + res[i].business_id + ',' + res[i].user_id + ',' + res[i].stars + ',' + res[i].date + ',' + res[i].text + ',' + res[i].useful + ',' + res[i].funny + ',' + res[i].cool + ')';
//       //    db.query(sql, (err, result) => {
//       //      if (err) {
//       //       console.error('Error writing data', err);
//       //      } else {
//       //       console.log(i, 'element inserted');
//       //      }
//       //    });
//       // }
//     }
//   });
// };

// doubleDataSet();
console.log('Begin: ', beginSeed);




db
  .query("SELECT * FROM review")
  .then(data => {
    var temp = [];
    for (var i = 0; i < 60; i++) {
      temp.push(data[0]);
    }
    var review = temp.reduce((a, b) => {
      return a.concat(b);
    });
    /*-----------ABOVE DUPES DATA----------------------*/
    const file = fs.createWriteStream("./data.csv");
    let write10MnTimes = (n = 1e7) => {
      let isReady = true;
      while (n > 0 && isReady) {
        review[n].id = n;
        isReady = file.write(
          `${review[n].id}, ${review[n].business_id}, ${
            review[n].user_id
          }, ${review[n].stars}, ${review[n].date}, ${
            review[n].text
          }, ${review[n].useful}, ${review[n].funny}, ${
            review[n].cool
          } \n`
        );
        n--;
      }
      file.once("drain", () => {
        write10MnTimes(n);
        console.log("draining at ", n);
      });
    };
    write10MnTimes();
  })
  .then(data => {
    console.log("review done");
    var endSeed = Date.now();
    console.log('Begin: ', endSeed);
  })
  .catch(error => {
    console.error(error);
  });