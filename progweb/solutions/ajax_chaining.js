const API = "https://swapi.dev/api/";
const TMPL_MOVIE = $(".tmpl-movie").clone().removeClass("tmpl");
const TMPL_PLANET = $(".tmpl-planet").clone().removeClass("tmpl");

const compareMovies = (m1, m2) => m1.episode_id - m2.episode_id;

const comparePlanets = (p1, p2) => p1.name.localeCompare(p2.name);

const loadUrls = urls => {
  let results = [];
  urls.forEach(url => {
    results.push($.ajax({url}));
  })
  return Promise.all(results);
};

const tmplMovie = movie => {
  let tmpl = TMPL_MOVIE.clone();
  // insert movie data into the template
  $.each(movie, (key, val) => tmpl.find(`.ph-movie-${key}`).text(val));
  // save planets URL for later
  $(".btn-planets", tmpl).data("urls", movie.planets);
  // save movie id for later
  $(".btn-planets", tmpl).data("movie-id", movie.episode_id);
  tmpl.attr("data-movie-id", movie.episode_id);
  return tmpl;
};

const tmplPlanet = planet => {
  let tmpl = TMPL_PLANET.clone();
  $.each(planet, (key, val) => tmpl.find(`.ph-planet-${key}`).text(val));
  return tmpl;
};

// manage AJAX loading icon
$(document).on("ajaxStart ajaxStop", event => {
  $("body").toggleClass("ajax-loading");
});

// manage Star Wars film
$.ajax({url: `${API}films/`})
  .then(data => data.results)
  .then(movies => movies.sort(compareMovies))
  .then(movies => movies.map(tmplMovie))
  .then(moviesDom => $(".movies").empty().append(moviesDom))
  .catch(console.warn);

// manage click for planets loading
$(".movies").on("click", ".btn-planets", event => {
  let btn = $(event.currentTarget);
  let movieId = btn.data("movie-id");
  let phPlanets = $(`.tmpl-movie[data-movie-id='${movieId}'] .planets`);
  // if allready loaded once, do a simple toggle of the list
  if (btn.data("loaded")) {
    phPlanets.toggle();
    return;
  }
  btn.prop("disabled", true);
  loadUrls(btn.data("urls"))
    .then(planets => planets.sort(comparePlanets))
    .then(planets => planets.map(tmplPlanet))
    .then(planetsDom => phPlanets.empty().append(planetsDom))
    .then(() => btn.data("loaded", true))
    .then(() => btn.prop("disabled", false))
    .catch(console.warn);
});
