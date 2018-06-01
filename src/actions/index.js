export function getProjects(json){
  return {
    type: 'GET_PROJECTS',
    payload: json
  }
}

export function parseFolders(json){

  let folders = json.map(proj => proj.folder)
  let removeDups = (arrArg) => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
  }
  return {
    type: 'PARSE_FOLDERS',
    payload: removeDups(folders)
  }
}

export function parseTitles(projects, clicked){

  let titles = (projects) =>
  projects.filter(proj =>
    proj.folder === clicked
  )

  return {
    type: 'PARSE_TITLES',
    payload: titles(projects)
  }
}

export function matchProject(projects, history){

  let projectMatch = (projects,history) =>
  projects.projects.filter(proj => {
    console.log(proj.id, history)
    return (
      proj.id.toString() === history
    )
  }
)

return {
  type: 'MATCH_PROJECT',
  payload: projectMatch(projects, history)
}
}
