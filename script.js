async function fetch() {
  const options = {
    method: 'GET',
    url: 'https://moviedatabase8.p.rapidapi.com/Random/20',
    headers: {
      'x-rapidapi-key': '00dcf8ad1bmshfba48a0565371afp170166jsnaa148f32f351',
      'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
fetch();
