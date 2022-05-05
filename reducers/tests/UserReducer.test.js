import React from 'react';
import renderer from 'react-test-renderer';

// A jest unit test for the user reducer
import UserReducer from '../UserReducer';

  it('should return the initial state', () => {
    expect(UserReducer(undefined, {})).toEqual({
      myDogs: {},
      myParks: {},
      myPacks: {}
    });
  });