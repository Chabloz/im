const SWAPI = 'https://swapi.dev/api/';

const TMPL_MOVIE = document.querySelector('.tmpl-movie').cloneNode(true);
const TMPL_PLANET = document.querySelector('.tmpl-planet').cloneNode(true);
TMPL_MOVIE.classList.remove('tmpl');
TMPL_PLANET.classList.remove('tmpl');

window.addEventListener('fetch-start', toggleFetchLoader);
window.addEventListener('fetch-stop', toggleFetchLoader);

loadMovies();

// delegated event for "show planets" button (the other solution is to use await above whe loading movies)
domOn('#movies', 'click', async evt => {
  const btn = evt.target;
  if (!btn.dataset.planetsUrl) return;
  const movieId = JSON.parse(btn.dataset.movieId);
  const planetsDom = document.querySelector(`.tmpl-movie[data-movie-id='${movieId}'] .planets`);
  // If we allready loaded those planets, we just toggle them
  if (btn.dataset.loaded) {
    planetsDom.classList.toggle('hidden');
  } else {
    // otherwise we get the urls of all the planets and load them
    btn.setAttribute('disabled', 'true');
    const planetsUrls = JSON.parse(btn.dataset.planetsUrl);
    await loadPlanets(planetsUrls, planetsDom);
    // mark them as loaded
    btn.dataset.loaded = true;
    btn.removeAttribute('disabled');
  }
})

async function loadMovies() {
  const movies = (await loadJsonUrl(SWAPI + 'films')).results;
  movies.sort((m1, m2) => m1.episode_id - m2.episode_id);
  const moviesDom = document.querySelector('#movies');
  for (const movie of movies) {
    moviesDom.appendChild(tmplMovie(movie));
  }
}

async function loadPlanets(planetsUrls, planetsDom) {
  const planets = await loadJsonUrls(planetsUrls);
  planets.sort((p1, p2) => p1.name.localeCompare(p2.name));
  for (const planet of planets) {
    planetsDom.appendChild(tmplPlanets(planet));
  }
}

function tmplPlanets(planet) {
  const tmpl = TMPL_PLANET.cloneNode(true);
  tmpl.querySelector('.ph-planet-name').textContent = planet.name;
  tmpl.querySelector('.ph-planet-climate').textContent = planet.climate;
  tmpl.querySelector('.ph-planet-diameter').textContent = planet.diameter;
  return tmpl;
}

function tmplMovie(movie) {
  const tmpl = TMPL_MOVIE.cloneNode(true);
  tmpl.querySelector('.ph-movie-title').textContent = movie.title;
  tmpl.querySelector('.ph-movie-episode_id').textContent = movie.episode_id;
  tmpl.querySelector('.btn-planets').dataset.movieId = movie.episode_id;
  tmpl.querySelector('.btn-planets').dataset.planetsUrl = JSON.stringify(movie.planets);
  tmpl.dataset.movieId = movie.episode_id;
  return tmpl;
}

function toggleFetchLoader() {
  document.querySelector('#fetch-loader').classList.toggle('hidden');
}

async function loadJsonUrls(urls) {
  window.dispatchEvent(new Event('fetch-start'));
  const results = await Promise.all(urls.map(url => fetch(url)));
  const responses = Promise.all(results.map(result => result.json()));
  window.dispatchEvent(new Event('fetch-stop'));
  return responses;
}

async function loadJsonUrl(url) {
  return (await loadJsonUrls([url]))[0];
}

function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}

function domOn(selector, event, callback, options) {
  domForEach(selector, ele => ele.addEventListener(event, callback, options));
}