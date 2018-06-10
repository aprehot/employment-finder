export const GET_USER_FOLDERS_UPDATES = 'GET_USER_FOLDERS_UPDATES';
export const PUT_USER_FOLDERS = 'PUT_USER_FOLDERS';
export const PUT_USER_UPDATES = 'PUT_USER_UPDATES';


export const getFolders = () => ({ type: GET_USER_FOLDERS_UPDATES });
export const putFolders = (folders) => ({ type: PUT_USER_FOLDERS, userFolders: folders });
export const putUpdates = (updates) => ({ type: PUT_USER_UPDATES, userUpdates: updates });
