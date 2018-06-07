import axios from 'axios'

export const fetchData = async () => {
  try {
    // const response = await fetch('https://randomuser.me/api');
    // const data = await response.json();
    const gucci = axios.get(`/api/users`);
    const data = gucci.then((response) => response)
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetch = (url) => {
  return axios.get(url)
  .then((data) => {
    return { data };
  })
  .catch((error) => {
    return { error };
  })
}
