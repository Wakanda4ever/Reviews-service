var Promise = require('bluebird');
var Sequelize = require('sequelize');
var mysql = require('mysql');
var sequelizeYelp = new Sequelize('yelp_db', 'root', 'blackboard', { host: 'localhost', dialect: 'mysql', logging: false });


var auth = sequelizeYelp
  .authenticate()
  .then(() => console.log('Connected to yelp_db'))
  .catch(err => console.error('Unable to connect to yelp_db', err));


var insertBatch = function(limit) {
  limit--;
  if (limit >= 0) {
    sequelizeYelp.query(`INSERT INTO business (id, name, neighborhood, address, city, state, postal_code, latitude, longitude, stars, review_count, is_open) select id, name, neighborhood, address, city, state, postal_code, latitude, longitude, stars, review_count, is_open FROM business;
   `)
    .catch(err => {
      console.error('Error doubling data');
    })
    .then(() => {
      console.log(`Successfully douled data in yelp_db Iterations: ${limit} left`);
      return insertBatch(limit);
    });
  }
};

var startTime = Date.now()
Promise.all([auth]).then(() => insertBatch(10));

// ID int NOT NULL AUTO_INCREMENT

// ALTER TABLE table_name ADD column_name datatype;

// alter table review add keys int not NULL AUTO_INCREMENT;


// ALTER TABLE vendors ADD COLUMN vendor_group INT NOT NULL;

// ALTER TABLE review ADD COLUMN keyId INT NOT NULL AUTO_INCREMENT PRIMARY KEY;

// ALTER TABLE review DROP PRIMARY KEY;

// ssh -i "new-ec2-key.pem" ec2-user@ec2-54-175-103-213.compute-1.amazonaws.com
// scp -i myAmazonKey.pem phpMyAdmin-3.4.5-all-languages.tar.gz ec2-user@mec2-50-17-16-67.compute-1.amazonaws.com:~/.

// // scp -i "new-ec2-key.pem" yelp_sql.tar   ec2-user@ec2-54-175-103-213.compute-1.amazonaws.com:~/

// ALTER TABLE document MODIFY COLUMN document_id INT auto_increment
// ALTER TABLE review MODIFY column keyId int auto_increment;

// ALTER TABLE business DROP PRIMARY KEY;

// CREATE TEMPORARY TABLE tmptable SELECT * FROM blogs WHERE lan = 2;
// UPDATE tmptable SET lan = 1;
// alter table tmptable drop column id;
// INSERT INTO blogs SELECT NULL,tmptable.* FROM tmptable;

// INSERT INTO review SELECT * FROM review;

// INSERT INTO review (col2, col3, ...) SELECT col2, 
//                     col3 FROM review
// INSERT INTO review (id, business_id, user_id, stars, date, text, useful, funny, cool) select id, business_id, user_id, stars, date, text, useful, funny, cool FROM review;


// INSERT INTO business (id, name, neighborhood, address, city, state, postal_code, latitude, longitude, stars, review_count, is_open) select id, name, neighborhood, address, city, state, postal_code, latitude, longitude, stars, review_count, is_open FROM business;


// If you can cope with table-at-a-time, and your data is not binary, use the -B option to the mysql command. With this option it'll generate TSV (tab separated) files which can import into Excel, etc, quite easily:

// % echo 'SELECT * FROM table' | mysql -B -uxxx -pyyy database
// Alternatively, if you've got direct access to the server's file system, use SELECT INTO OUTFILE which can generate real CSV files:

// SELECT * INTO OUTFILE 'table.csv'
//     FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
//     LINES TERMINATED BY '\n'
// FROM table

// select * into OUTFILE 'review.csv' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' FROM review;