import axios from 'axios';

export const fetch = (url, {email, password}) =>
  axios.post(url, { email, password })
    .then((data) => ({ data }))
    .catch((error) => ({ error }));
