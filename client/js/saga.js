import { put, all, takeEvery } from 'redux-saga/effects'
import api from './api'

function* fetchReviews (action) {
  try {
    const data = yield api.getReviews(action.params)
    yield put({ type: 'FETCHING_REVIEWS_SUCCESS', data });
  } catch (e) {
    yield put({ type: 'FETCHING_REVIEWS_FAILURE' });
  }
}
function* fetchUserData (action) {
  try {
    const data = yield api.getUserData(action.id)
    yield put({ type: 'FETCHING_USERDATA_SUCCESS', id: action.id, data });
  } catch (e) {
    yield put({ type: 'FETCHING_USERDATA_FAILURE'});
  }
}
const sagas = [
  takeEvery('FETCHING_REVIEWS', fetchReviews),
  takeEvery('FETCHING_USERDATA', fetchUserData)
];
function* rootSaga () {
  yield all([
    ...sagas
  ]);
}

export default rootSaga;