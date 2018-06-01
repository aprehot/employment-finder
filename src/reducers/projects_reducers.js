export default function(state={}, action){
  switch(action.type){
    case 'GET_PROJECTS':
      return {...state, projects: action.payload}
    case 'PARSE_FOLDERS':
      return {...state, folders:action.payload}
    case 'PARSE_TITLES':
      return {...state, titles:action.payload}
    // case 'CLEAR_ARTISTS_DETAIL':
    //   return {...state, artistData:action.payload}
    default:
      return state;
  }

}
