export const GET_USER_FOLDERS = 'GET_USER_FOLDERS';
export const PUT_USER_FOLDERS = 'PUT_USER_FOLDERS';


export const getFolders = () => ({ type: GET_USER_FOLDERS });
export const putFolders = (folders) => ({ type: PUT_USER_FOLDERS, userFolders: folders });
