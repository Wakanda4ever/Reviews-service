import axios from 'axios';
export default {
  getReviews: (params) => {
    return new Promise((resolve, reject) => {
      var url = `/reviews/reviews/${params.id}`;
      var keys = Object.keys(params);
      keys.shift();
      if (keys.length) {
        var urlParams = keys.map(key => key + '=' + params[key]);
        url += '?' + urlParams.join('&');
      }
      axios.get(url).then(res => {
        if (res.data) {
          resolve(res.data);
        }
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    })
  },
  getUserData: id => {
    return new Promise((resolve, reject) => {
      axios.get(`/reviews/user/${id}`).then(res => {
        if (res.data) {
          resolve(res.data);
        }
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    })
  }
}