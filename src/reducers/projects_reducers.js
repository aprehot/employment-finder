export default function(state={}, action){
  switch(action.type){
    case 'GET_PROJECTS':
      return {...state, projects: action.payload}
    case 'PARSE_FOLDERS':
      return {...state, folders:action.payload}
    case 'PARSE_TITLES':
      return {...state, titles:action.payload}
    // case 'MATCH_PROJECT':
    //   return {...state, correctPage:action.payload}
    default:
      return state;
  }

}
