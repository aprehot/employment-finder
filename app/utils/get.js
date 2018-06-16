import axios from 'axios';

export const fetchGet = (url) => axios.get(url)
  .then((data) => ({ data }))
  .catch((error) => ({ error }));
