var request = require('request');
var cheerio = require('cheerio');
var models = require('../models');

module.exports = {
  reviews: {
    get: (req, res) => {
      models.business.get(req.params.id).then(name => {
        models.reviews.get(req.params.id, req.query).then(data => {
          res.json({...name[0], pages: data.pages, reviews: data.reviews});
        });
      }).catch(err => {
        console.log('oh no db error');
        res.end();
      });
    }
  },
  user: {
    get: (req, res) => {
      var url = `https://www.yelp.com/user_details?userid=${req.params.id}`;
      request(url, (error, response, html) => {
        if(!error){
          var $ = cheerio.load(html);
          var userPicUrl = $('.photo-slideshow_slide.is-active');
          // console.log(userPicUrl);
          if (userPicUrl) {
            userPicUrl = userPicUrl.css('background-image');
            if (userPicUrl.length) {
              userPicUrl = userPicUrl.substr(4, userPicUrl.length - 5);
              models.userpic.save(req.params.id, userPicUrl).then(err => {
                if (err) {
                  console.log('error saving');
                } else {
                  console.log('saved url succesfully');
                }
              });
            }
            res.json({url: userPicUrl});
          } else {
            res.end();
          }
        } else {
          console.log(error);
          res.end();
        }
      });
    }
  }
};