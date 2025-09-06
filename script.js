const sliderContainer = document.querySelector('.slider-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const sliderOuterContainer = document.querySelector('.slider-outer-container');
let currentTranslateX = 0;

const faqQuestions = document.querySelectorAll('.FAQ-question');

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

function moveSlide(step) {
  const item = document.querySelector('.image-div');
  if (!item) return;

  const itemWidth = item.offsetWidth + 16; // account for margin/gap
  const maxTranslateX =
    sliderContainer.scrollWidth - sliderOuterContainer.offsetWidth;

  currentTranslateX += step * itemWidth;

  if (currentTranslateX < 0) {
    currentTranslateX = 0;
  } else if (currentTranslateX > maxTranslateX) {
    currentTranslateX = 0; // loop back to start
  }

  sliderContainer.style.transform = `translateX(-${currentTranslateX}px)`;
}

nextBtn.addEventListener('click', () => moveSlide(1));
prevBtn.addEventListener('click', () => moveSlide(-1));

setInterval(() => moveSlide(1), 3000);


faqQuestions.forEach((faqQuestion) => {
  faqQuestion.addEventListener('click', (event) => {
    const openFaqQuestion = document.querySelector('.FAQ-question.active');
    if (openFaqQuestion && openFaqQuestion !== faqQuestion) {
      openFaqQuestion.classList.toggle('active');
      openFaqQuestion.nextElementSibling.style.maxHeight = 0;
    }

    faqQuestion.classList.toggle('active');
    const faqAnswer = faqQuestion.nextElementSibling;

    if (faqQuestion.classList.contains('active')) {
      faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
    } else {
      faqAnswer.style.maxHeight = 0;
    }
  });
});

const FAQItems = document.querySelectorAll('.FAQ-item');
const features = document.querySelectorAll('.feature');

function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view'); // Add the class when the element is in view
    } else {
      entry.target.classList.remove('in-view'); // Remove the class when the element is out of view
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.1 // Trigger when 30% of the element is visible
});

FAQItems.forEach(FAQItem => {
  observer.observe(FAQItem);
});

features.forEach(feature => {
  observer.observe(feature);
})