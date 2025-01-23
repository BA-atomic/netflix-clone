const sliderContainer = document.querySelector('.slider-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const sliderOuterContainer = document.querySelector('.slider-outer-container');
let currentTranslateX = 0;

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
}

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
  sliderContainer.innerHTML = '';

  movies.forEach((movie) => {
    const innerSliderContainer = document.createElement('div');
    innerSliderContainer.classList.add('image-div');
    const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const poster = movie.poster_path
      ? `${POSTER_BASE_URL}${movie.poster_path}`
      : 'https://via.placeholder.com/200x300?text=No+Image';

    innerSliderContainer.innerHTML = `
          <img src="${poster}"/>
        `;
    sliderContainer.appendChild(innerSliderContainer);
  });
}

async function main() {
  const movies = await fetchData();
  displayMovies(movies);
}
main();

function moveSlide(amount) {
  const maxTranslateX =
    sliderContainer.scrollWidth - sliderOuterContainer.offsetWidth;

  currentTranslateX += amount;

  if (currentTranslateX < 0) {
    currentTranslateX = 0;
  } else if (currentTranslateX > maxTranslateX) {
    currentTranslateX = 0; // Loop back to the start
  }

  sliderContainer.style.transform = `translateX(-${currentTranslateX}px)`;
}

nextBtn.addEventListener('click', () => {
  moveSlide(200);
});

prevBtn.addEventListener('click', () => {
  moveSlide(-200);
});


setInterval(() => {
  moveSlide(200);
}, 2000);
