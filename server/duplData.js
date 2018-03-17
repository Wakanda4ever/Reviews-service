
var Promise = require('bluebird');
var Sequelize = require('sequelize');
var sequelizeChompy = new Sequelize('yelpData', 'root', '',
  { host: 'localhost', dialect: 'mysql', logging: false });
var sequelizeYelp = new Sequelize('yelp_db', 'root', '',
  { host: 'localhost', dialect: 'mysql', logging: false });

var auth1 = sequelizeChompy
  .authenticate()
  .then(() => console.log('Connected to chompy_db'))
  .catch(err => console.error('Unable to connect to chompy_db', err));

var auth2 = sequelizeYelp
  .authenticate()
  .then(() => console.log('Connected to yelp_db'))
  .catch(err => console.error('Unable to connect to yelp_db', err));

var auths = [auth1, auth2];

var insertBatch = function(limit, offset, counter) {
  if (offset >= 4174567) {
    sequelizeYelp.close();
    sequelizeChompy.close();
    var endTime = Date.now();
    console.log('TIME TAKEN:', (endTime - startTime) / 1000);
    return;
  }
  sequelizeYelp.query(`SELECT * FROM review LIMIT ${limit} OFFSET ${offset};`)
    .then(result => {
    var reviews = result[0];
    var insertionPromises = [];
    for (var i = 0; i < reviews.length; i++) {
      var queryString = 'INSERT INTO business ' +
        '(id, business_id, user_id, date, text, useful, funny, cool) ' +
        'VALUES ';
      var replacements = [];
      for (var j = 0; j < 59; j++) {
        queryString += '(?, ?, ?, ?, ?, ?, ? , ?, ?), ';
        replacements.push(
          counter,
          reviews[i].business_id,
          reviews[i].user_id,
          reviews[i].date,
          reviews[i].text,
          reviews[i].useful,
          reviews[i].funny,
          reviews[i].cool
        );
        counter++;
      }
      queryString += '(?, ?, ?, ?, ?, ?);';
      replacements.push(
        counter,
        reviews[i].business_id,
        reviews[i].user_id,
        reviews[i].date,
        reviews[i].text,
        reviews[i].useful,
        reviews[i].funny,
        reviews[i].cool
      );
      counter++;

      insertionPromises.push(
        sequelizeChompy.query(queryString, { replacements: replacements })
      );

    }
    return Promise.all(insertionPromises);
  }).catch((err) => {
    console.error('Failed to seed Chompy database', err);
  }).then(() => {
    console.log(`Successfully inserted ${limit} * 60 items into Chompy database. Offset: ${offset}`);
    return insertBatch(limit, offset + limit, counter);
  })
}

var startTime = Date.now()
Promise.all(auths).then(() => insertBatch(1000, 0, 1));