export default function(state={}, action){

  switch(action.type){
    case 'GET_PROJECTS':
      return {...state, projects: action.payload}
    // case 'GET_ARTISTS_ALL':
    //   return {...state, artistList:action.payload}
    // case 'GET_ARTISTS_DETAIL':
    //   return {...state, artistData:action.payload}
    // case 'CLEAR_ARTISTS_DETAIL':
    //   return {...state, artistData:action.payload}
    default:
      return state;
  }

}
