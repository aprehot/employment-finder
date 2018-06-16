const fetchData = async (res) => {
  try {
    const response = await res;
    // console.log(response);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log('error has occured');
  }
};

export default fetchData;
