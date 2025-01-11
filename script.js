const sliderContainer = document.querySelector('.slider-container');

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
  sliderContainer.style.display = 'block';
  sliderContainer.innerHTML = '';

  movies.forEach((movie) => {
    const innerSliderContainer = document.createElement('div');
    const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500}${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';
   
    innerSliderContainer.innerHTML = `
        <div>
          <img src="${poster}"/>
          <p>${movie.title}</p>
        </div>
        `;
    sliderContainer.appendChild(innerSliderContainer);
  });
}

async function main() {
  const movies = await fetchData();
  displayMovies(movies);
}

// Run the main function on page load
main();
