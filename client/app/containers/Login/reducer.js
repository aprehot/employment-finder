import { fromJS } from 'immutable';

import { USER_LOGIN } from './constants';

const initialState = fromJS({
  login: ''
});

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return state
        .set('login', action.email action.password);
    default:
      return state;
  }
}
