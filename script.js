const slider = document.querySelector('.slider');

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
  return tenMovies;
  // console.log(tenMovies);
}
// fetchData();

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

function displayMovies(movies) {
  slider.style.display = 'block';
  slider.innerHTML = '';

  movies.forEach((movie) => {
    const innerSliderContainer = document.createElement('div');
    const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const poster = movie.poster_path
      ? `${POSTER_BASE_URL}${movie.poster_path}`
      : 'https://via.placeholder.com/200x300?text=No+Image';

    innerSliderContainer.innerHTML = `
          <img src="${poster}"/>
        `;
    slider.appendChild(innerSliderContainer);
  });
}

async function main() {
  const movies = await fetchData();
  displayMovies(movies);
}
main();
