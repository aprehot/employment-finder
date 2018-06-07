import { RECIEVE_LOGIN, LOGIN_REQUEST } from './actions';

export default (state = {}, { type, user, credentials }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        credentials
      };
    case RECIEVE_LOGIN:
      return {
        ...state,
        user
      };
    default:
      return state;
  }
};
