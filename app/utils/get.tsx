import axios from 'axios';

export const fetchGet = (url: any) => axios.get(url)
  .then((data) => ({ data }))
  .catch((error) => ({ error }));
