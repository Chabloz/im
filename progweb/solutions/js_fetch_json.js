const WS_GEONAMES = "http://api.geonames.org/postalCodeLookupJSON?username=comem&country=CH&postalcode=";
const WS_MAP = "https://chabloz.eu/map/staticmap.php?zoom=14&size=512x512&maptype=mapnik&center=";

domOn('#code', 'input', async evt => {
  const npa = Number(evt.currentTarget.value);
  if (!Number.isInteger(npa) || npa < 1000 || npa > 9999) return;

  const data = await fetchJson(`${WS_GEONAMES}${npa}`);
  const places = data.postalcodes;
  if (places.length == 0) return;

  const allDomPlaces = [];
  for (const place of places) {
    allDomPlaces.push(tmplPlaces(place));
  }

  const place = document.querySelector('#localite')
  place.replaceChildren(...allDomPlaces);
  place.dispatchEvent(new Event('input'));
})

domOn('#localite', 'input', () => {
  const place = document.querySelector('#localite').selectedOptions[0];
  const mapUrl = `${WS_MAP}${place.dataset.lat},${place.dataset.lng}`;
  document.querySelector('#map').setAttribute('src', mapUrl);
});

function tmplPlaces(place) {
  const tmpl = document.createElement('option');
  tmpl.textContent = place.placeName;
  tmpl.dataset.lat = place.lat;
  tmpl.dataset.lng = place.lng;
  return tmpl;
}

async function fetchJson(url) {
  const response = await fetch(url);
  const body = await response.json();
  return body;
}

function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}

function domOn(selector, event, callback, options) {
  domForEach(selector, ele => ele.addEventListener(event, callback, options));
}