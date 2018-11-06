const WS_SEARCH = "https://chabloz.eu/movies/?query=";
const WS_THUMB = "https://chabloz.eu/movies/thumb/?id=";
const WS_RATING_GET = "https://chabloz.eu/movies/rating/get/?id=";
const WS_RATING_POST = "https://chabloz.eu/movies/rating/post/";

const TMPL_MOVIE = $(".templateMovie").clone().removeClass("template");
const TMPL_NO_RESULT = $(".templateNoResult").clone().removeClass("template");

const searchMovies = async query => {
  return await $.ajax({url: `${WS_SEARCH}${query}`});
};

const loadRating = async id => {
  return await $.ajax({url: `${WS_RATING_GET}${id}`});
};

const postRating = async (id, rating) => {
  return await $.ajax({
    url: WS_RATING_POST,
    data : {id, rating}
  });
}

const movieToDom = movie => {
  let tmpl = TMPL_MOVIE.clone();
  tmpl.attr('data-movie-id', movie.id);
  $(".rateIt", tmpl).data('movie-id', movie.id);
  $(".title", tmpl).text(movie.title);
  $(".description", tmpl).text(movie.description);
  $("img", tmpl).attr("src", `${WS_THUMB}${movie.id}`);
  $(".review", tmpl).hide();
  tmpl.appendTo("#results");
};

const ratingToDom = (xmlRating, movieId) => {
  let rating = $("rating rating", xmlRating).text();
  let votes = $("votes", xmlRating).text();
  let tmpl = $(`[data-movie-id="${movieId}"]`);
  $(".rating", tmpl).text(rating);
  $(".rating", tmpl).addClass(`rating${Math.round(rating)}`);
  $(".votes", tmpl).text(votes);
  $(".review", tmpl).show();
}

$("form").on("submit", async event => {
  event.preventDefault();
  let movies = await searchMovies($("#search").val());
  $("#results").empty();
  if (!movies || movies.length == 0) {
    TMPL_NO_RESULT.appendTo("#results");
  } else {
    movies.forEach(movieToDom);
    movies.forEach(async movie => {
      let xmlRating = await loadRating(movie.id);
      ratingToDom(xmlRating, movie.id);
    });
  }
});

$("#results").on("click", ".rateIt", async event => {
  let rating = $(event.currentTarget).data("rating");
  let id = $(event.currentTarget).data("movie-id");
  let xmlRating = await postRating(id, rating);
  ratingToDom(xmlRating, id);
});
