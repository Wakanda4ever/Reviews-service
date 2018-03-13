var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  business: {
    get: id => {
      return new Promise((resolve, reject) => {
        var query = `select name from business where id='${id}'`;
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            // console.log(result[0]);
            resolve(result);
          }
        });
      });
    }
  },
  reviews: {
    get: (id, params) => {
      return new Promise((resolve, reject) => {
        console.log(params);
        var query = `select review.stars, review.date, review.text,
        review.useful, review.funny, review.cool, user.id as user_id, user.name as user_name,
        user.review_count as user_reviewcount, user.yelping_since as user_yelping_since,
        user.useful as user_useful, user.funny as user_funny, user.cool as user_cool,
        user.fans as user_fans, user.average_stars as user_average_stars, user.pic as user_pic
        from review inner join user on review.user_id=user.id where business_id='${id}'`;
        switch (params.sort_by) {
          case 'date_desc':
            query += ' order by review.date desc';
            break;
          case 'date_asc':
            query += ' order by review.date asc';
            break;
          case 'rating_desc':
            query += ' order by review.stars desc';
            break;
          case 'rating_asc':
            query += ' order by review.stars asc';
            break;
          default:
            query += ' order by year(review.date) desc, (review.useful + review.funny + review.cool) desc';
        }
        if (params.q) {
          query = `select * from (` + query + `) as reviews where reviews.text like '%${params.q}%'`
        }
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            var pages = Math.ceil(result.length / 20);
            var reviews;
            if (params.start) {
              reviews = result.slice(params.start, (params.start * 1) + 20);
            } else {
              reviews = result.slice(0, 20);
            }
            resolve({pages: new Array(pages), reviews: reviews});
          }
        });
        // query += ' limit 20';
        // if (params.start) {
        //   query += ` offset ${params.start}`
        // }
      });
    }
  },
  userpic: {
    save: (id, url) => {
      return new Promise((resolve, reject) => {
        var query = `update user set pic='${url}' where id='${id}'`;
        db.query(query, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  }
};