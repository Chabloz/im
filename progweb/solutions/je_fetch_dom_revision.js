const WS_BASE = 'https://chabloz.eu/';
const WS_SEARCH = WS_BASE + 'movies/?query=';
const WS_THUMB = WS_BASE + 'movies/thumb/?id=';
const WS_RATING_GET = WS_BASE + 'movies/rating/get/?id=';
const WS_RATING_POST = WS_BASE + 'movies/rating/post/?id=';

const TMPL_MOVIE = document.querySelector('.template-movie').cloneNode(true);
const TMPL_NO_RESULT = document.querySelector('.template-no-result').cloneNode(true);
TMPL_MOVIE.classList.remove('template');
TMPL_NO_RESULT.classList.remove('template');

// Fetch all movies on form submit
domOn('form', 'submit', async event => {
  event.preventDefault();
  const place = document.querySelector('#search').value;
  const movies = await fetchJson(WS_SEARCH + place);
  const domMovies = document.querySelector('#results');

  // if no results ....
  if (movies?.length == 0) {
    domMovies.replaceChildren(TMPL_NO_RESULT);
    return;
  }

  // order by title of movie
  movies.sort((m1, m2) => m1.title.localeCompare(m2.title));

  // transform movies into DOM
  const tmplMovies = [];
  for (const movie of movies) {
    tmplMovies.push(movieToDom(movie));
  }
  domMovies.replaceChildren(...tmplMovies);

  // fetch rating and tranform them into DOM
  for (const movie of movies) {
    const xmlRating = await fetchXml(WS_RATING_GET + movie.id);
    ratingToDom(xmlRating, movie.id);
  }

});

// Send user's rating to backend on click
domOn('#results', 'click', async event => {
  const btn = event.target;
  // if not a "rating button" we stop
  if (!btn.dataset.rating) return;
  const rating = btn.dataset.rating;
  const id = btn.dataset.movieId;
  const xmlRating = await fetchXml(`${WS_RATING_POST}${id}&rating=${rating}`);
  ratingToDom(xmlRating, id);
});

function movieToDom(movie) {
  const tmpl = TMPL_MOVIE.cloneNode(true);
  tmpl.dataset.movieId = movie.id;
  tmpl.querySelector('.rate-it').dataset.movieId = movie.id;
  tmpl.querySelector('.title').textContent = movie.title;
  tmpl.querySelector('.description').textContent = movie.description;
  tmpl.querySelector('.thumb').setAttribute('src', WS_THUMB + movie.id);
  return tmpl;
}

function ratingToDom(xmlRating, movieId) {
  const rating = xmlRating.querySelector('rating > rating').textContent;
  const votes = xmlRating.querySelector('votes').textContent;
  const tmpl = document.querySelector(`[data-movie-id="${movieId}"]`);
  tmpl.querySelector('.rating').textContent = rating;
  tmpl.querySelector('.rating').classList.add(`rating${Math.round(rating)}`);
  tmpl.querySelector('.votes').textContent = votes;
  // save the movie id on each "rate-it btn" for later use
  tmpl.querySelectorAll('.rate-it').forEach(btn => btn.dataset.movieId = movieId);
}

function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}

function domOn(selector, event, callback) {
  domForEach(selector, ele => ele.addEventListener(event, callback));
}

async function fetchJson(url) {
  const resp = await fetch(url);
  return resp.json();
}

async function fetchXml(url) {
  let response = await fetch(url);
  const xmlText = await response.text();
  // Convert the XML text into a XML DOM
  const parser = new DOMParser();
  const xmlDom = parser.parseFromString(xmlText, 'text/xml');
  return xmlDom;
}
