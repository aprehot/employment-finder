const fetchData = async (res) => {
  try {
    const response = await res;
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default fetchData;
