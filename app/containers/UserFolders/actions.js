export const GET_USER_FOLDERS = 'GET_USER_FOLDERS';
export const PUT_USER_FOLDERS = 'PUT_USER_FOLDERS';

export const GET_FOLDER_CONTENTS = 'GET_FOLDER_CONTENTS';
export const PUT_FOLDER_CONTENTS = 'PUT_FOLDER_CONTENTS';


export const getFolders = () => ({ type: GET_USER_FOLDERS });
export const putFolders = (folders) => ({ type: PUT_USER_FOLDERS, userFolders: folders });


export const getContents = (fold, cat) => ({ type: GET_FOLDER_CONTENTS, contentRequest: [fold, cat] });
export const putContents = (folderContents) => ({ type: PUT_FOLDER_CONTENTS, folderContents });
