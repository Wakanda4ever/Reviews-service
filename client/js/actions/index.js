export const fetchReviews = params => {
  return {
    type: 'FETCHING_REVIEWS',
    params: params
  };
};
export const fetchUserData = id => {
  return {
    type: 'FETCHING_USERDATA',
    id
  };
};