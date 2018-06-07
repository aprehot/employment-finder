import { HANDLE_AUTH } from './actions';
import { RECIEVE_LOGIN, LOGIN_REQUEST } from '../../Login/actions';


export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        submission: action.payload
      };
    case RECIEVE_LOGIN:
      return {
        ...state,
        login: action.payload
      };
    case HANDLE_AUTH:
      return {
        ...state,
        auth: action.payload
      };
    default:
      return state;
  }
}
