import { RECEIVE_API_DATA } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_API_DATA:
      return {
        ...state,
        category: action.payload
      };
    default:
      return state;
  }
};
