import React from 'react';
import { connect } from 'react-redux';

const PageBtn = ({params, page}) => {
  return (
    <div className="guinzar-page-btn">
      <a href={params.id + '?' + (params.q ? 'q=' + params.q + '&': '') +
      (params.sort_by ? 'sort_by=' + params.sort_by  + '&': '') +
      'start=' + (page * 20)}>{page + 1}</a>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    params: state.params
  };
};
export default connect(mapStateToProps)(PageBtn);