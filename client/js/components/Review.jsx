import React from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions'
import QualityBtn from './QualityBtn.jsx';
import $ from 'jquery';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.review.date).toDateString();
    this.user_since = new Date(this.props.review.user_yelping_since).toDateString();
    this.hearts = [];
    for (var i = 0; i < this.props.review.stars; i++) {
      this.hearts.push(i);
    }
  }
  componentDidMount() {
    if (!this.props.review.user_pic) {
      console.log('fetch');
      this.props.fetchUserData(this.props.review.user_id);
    } else {
      console.log('dont fetch');
    }
    if (this.props.params.q) {
      var src_str = $('#guinzar-review-' + this.props.keyVal).text();
      var term = this.props.params.q;
      term = term.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
      var pattern = new RegExp("("+term+")", "gi");
      src_str = src_str.replace(pattern, "<mark>$1</mark>");
      src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");
      $('#guinzar-review-' + this.props.keyVal).html(src_str);
    }
  }
  render() {
    return (
      <div className="guinzar-review-container">
        <div className="guinzar-user">
          <div className="guinzar-user-info">
            <div className="guinzar-user-picture">
              <div className="guinzar-user-pic"
                style={this.props.userData.data[this.props.review.user_id] ?
                  {backgroundImage: "url(" + this.props.userData.data[this.props.review.user_id].url + ")"}
                  : {backgroundImage: "url(" + this.props.review.user_pic + ")"}}></div>
              <div className="guinzar-user-since">
                Chomper since:<br />{this.user_since}
              </div>
            </div>
            <div className="guinzar-user-stats">
              <div className="guinzar-user-name">
                <a className="guinzar-user-link" href={'https://www.yelp.com/user_details?userid='
                  + this.props.review.user_id}>{this.props.review.user_name}</a>
              </div>
              <div className="guinzar-user-reviewcount">
                Reviews: {this.props.review.user_reviewcount}
              </div>
              <div className="guinzar-user-avgstars">
                Avg Stars: {this.props.review.user_average_stars}
              </div>
              <div className="guinzar-user-fans">
                Fans: {this.props.review.user_fans}
              </div>
              <div className="guinzar-user-useful">
                Useful: {this.props.review.user_useful}
              </div>
              <div className="guinzar-user-funny">
                Funny: {this.props.review.user_funny}
              </div>
              <div className="guinzar-user-cool">
                Cool: {this.props.review.user_cool}
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
        <div className="guinzar-review">
          <div className="guinzar-review-header">
            <div className="guinzar-review-hearts">
              {this.hearts.map((star, i) => <div key={i} className="guinzar-review-heart"></div>)}
            </div>
            <div className="guinzar-review-date">
              {this.date}
            </div>
          </div>
          <div id={'guinzar-review-' + this.props.keyVal} className="guinzar-review-text">
            {this.props.review.text}
          </div>
          <div className="guinzar-review-qualities">
            <QualityBtn quality={['Useful', this.props.review.useful]} />
            <QualityBtn quality={['Funny', this.props.review.funny]} />
            <QualityBtn quality={['Cool', this.props.review.cool]} />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    params: state.params,
    userData: state.userData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: (id) => {
      dispatch(fetchUserData(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);