import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

// import AppRoot from '../client/js/components/AppRoot.jsx';
import * as actions from '../client/js/actions'

test('adds 1 + 1 to equal 2', () => {
  expect(1 + 1).toBe(2);
});

describe('fetchReviews actions', () => {
  it('should create an action to add a fetchReviews', () => {
    const params = {};
    const expectedAction = {
      type: 'FETCHING_REVIEWS',
      params
    }
    expect(actions.fetchReviews(params)).toEqual(expectedAction)
  })
})
describe('fetchUserData actions', () => {
  it('should create an action to add a fetchUserData', () => {
    const id = '1234';
    const expectedAction = {
      type: 'FETCHING_USERDATA',
      id
    }
    expect(actions.fetchUserData(id)).toEqual(expectedAction)
  })
})