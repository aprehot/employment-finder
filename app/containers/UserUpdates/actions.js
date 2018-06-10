export const GET_USER_UPDATES = 'GET_USER_UPDATES';
export const PUT_USER_UPDATES = 'PUT_USER_UPDATES';

export const getUpdates = () => ({ type: GET_USER_UPDATES });
export const putUpdates = (updates) => ({ type: PUT_USER_UPDATES, userUpdates: updates });
