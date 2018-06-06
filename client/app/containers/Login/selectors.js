import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');

const makeSelectLogin = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('user')
);

export {
  selectLogin,
  makeSelectLogin,
};
