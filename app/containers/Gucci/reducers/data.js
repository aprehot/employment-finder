import { RECEIVE_API_DATA } from '../actions';

export default (state = {}, { data, type }) => {
  switch (type) {
    case RECEIVE_API_DATA:
      return {
        ...state,
        data
      };
    default:
      return state;
  }
};
