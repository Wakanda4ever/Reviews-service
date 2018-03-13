import React from 'react';
import { connect } from 'react-redux';
import { fetchReviews } from '../actions'
import Review from './Review.jsx';
import PageBtn from './PageBtn.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchReviews(this.props.params);
  }
  render() {
    return (
      <div>
        {this.props.reviews.data.reviews ?
          this.props.reviews.data.reviews.map((review, i) =>
          <Review key={i} keyVal={i} review={review} />) : 'loading'}
        <div className="guinzar-pages">
          {this.props.reviews.data.pages ?
            this.props.reviews.data.pages.map((page, i) => <PageBtn key={i} page={i} />) : ''}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    params: state.params,
    reviews: state.reviews
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchReviews: (params) => {
      dispatch(fetchReviews(params));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);