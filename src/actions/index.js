

export function getProjects(json){
  console.log(json)
  return {
    type: 'GET_PROJECTS',
    payload: json
  }
}
