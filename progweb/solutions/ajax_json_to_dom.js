const WS_GEONAMES = "http://api.geonames.org/postalCodeLookupJSON?username=comem&country=CH&postalcode=";
const WS_MAP = "https://chabloz.eu/map/staticmap.php?zoom=14&size=512x512&maptype=mapnik&center=";

const loadPlaces = async code => {
  return await $.ajax({url : `${WS_GEONAMES}${code}`});
};

const changeMap = (lat, lng) => {
   $("#map img").attr('src', `${WS_MAP}${lat},${lng}`);
}

$("#code").on("keyup", async e => {
  let cp = $("#code").val();
  if (cp.length !== 4) return;
  let json = await loadPlaces(cp);
  let places = json.postalcodes;
  $("#localite").empty();
  places.forEach(place => {
    let opt = $("<option>");
    opt.text(place.placeName);
    opt.data("geoData", place);
    opt.appendTo("#localite")
  });
  $("#localite").trigger("change");
});

$("#localite").on("change", event => {
  let opt = $("#localite :selected");
  let geoData = opt.data("geoData");
  changeMap(geoData.lat, geoData.lng);
});
