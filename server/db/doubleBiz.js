var Promise = require('bluebird');
var Sequelize = require('sequelize');
var yelpDb = new Sequelize('yelpData', 'root', '',
  { host: 'localhost', dialect: 'mysql', logging: false });
var sequelizeYelp = new Sequelize('yelp_db', 'root', '',
  { host: 'localhost', dialect: 'mysql', logging: false });

var auth1 = yelpDb
  .authenticate()
  .then(() => console.log('Connected to yelpData'))
  .catch(err => console.error('Unable to connect to yelpData', err));

var auth2 = sequelizeYelp
  .authenticate()
  .then(() => console.log('Connected to yelp_db'))
  .catch(err => console.error('Unable to connect to yelp_db', err));

var auths = [auth1, auth2];

var insertBatch = function(limit, offset, counter) {
  if (offset >= 2174567) {
    sequelizeYelp.close();
    yelpDb.close();
    var endTime = Date.now();
    console.log('TIME TAKEN:', (endTime - startTime) / 1000);
    return;
  }
  sequelizeYelp.query(`SELECT name, stars, review_count FROM business LIMIT ${limit} OFFSET ${offset};`)
    .then(result => {
    var businesses = result[0];
    var insertionPromises = [];
    for (var i = 0; i < businesses.length; i++) {
      var queryString = 'INSERT INTO business ' +
        '(id, name, stars, review_count, claimed, dollar_signs) ' +
        'VALUES ';
      var replacements = [];

      for (var j = 0; j < 59; j++) {
        queryString += '(?, ?, ?, ?, ?, ?), ';
        replacements.push(
          counter,
          businesses[i].name,
          businesses[i].stars,
          businesses[i].review_count,
          true,
          businesses[i].stars
        );
        counter++;
      }
      queryString += '(?, ?, ?, ?, ?, ?);';
      replacements.push(
        counter,
        businesses[i].name,
        businesses[i].stars,
        businesses[i].review_count,
        true,
        businesses[i].stars
      );
      counter++;

      insertionPromises.push(
        yelpDb.query(queryString, { replacements: replacements })
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
Promise.all(auths).then(() => insertBatch(1000, 1260, 1260));