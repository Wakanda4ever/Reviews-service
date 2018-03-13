import React from 'react';
import { connect } from 'react-redux';

const Header = ({ reviews }) => (
  <div className="guinzar-header">
    <span className="guinzar-yellow">Recommended Reviews</span> for {reviews.data.name}
  </div>
);

function mapStateToProps (state) {
  return {
    reviews: state.reviews
  }
}
export default connect(mapStateToProps)(Header);