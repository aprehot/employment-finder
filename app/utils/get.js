import axios from 'axios';

export const fetch = (url) => axios.get(url)
  .then((data) => ({ data }))
  .catch((error) => ({ error }));
