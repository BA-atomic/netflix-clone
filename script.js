async function fetchData() {
  const randomNumber = Math.floor(Math.random() * 500) + 1;
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomNumber}&sort_by=popularity.desc`,
    {
      params: {
        api_key: '45601c7960258aafebbf8ed4f27131c6',
      },
    }
  );

  if (response.data.Error) {
    return [];
  }

  const allMovies = response.data.results;
  const tenMovies = getTenRandomMovies(allMovies, 10);
  console.log(tenMovies);
}
fetchData();

function getTenRandomMovies(array, size) {
  const result = [];
  const tempResult = [...array];

  for (let i = 0; i < size; i++) {
    randomIndex = Math.floor(Math.random() * result.length);
    result.push(tempResult[randomIndex]);
    tempResult.splice(randomIndex, 1); //remove the selected random index
  }

  return result;
}
