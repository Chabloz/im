const WS_SCHEDULE = 'https://chabloz.eu/files/horaires/';
const TMPL_COURSE = document.querySelector('.template-course').cloneNode(true);
TMPL_COURSE.classList.remove('template');

domOn('.btn-schedule', 'click', async event => {
  // get the class ID from the data-* (dataset)
  let classId = event.currentTarget.dataset.classId;

  // Remove selected status of all btn and add it to the active one
  domForEach('.btn-schedule', el => el.classList.remove('selected'));
  event.currentTarget.classList.add('selected');

  // Disable all btn to prevent double loading of the schedule
  domForEach('.btn-schedule', el => el.setAttribute('disabled', 'true'));

  // Load schedule
  const url = `${WS_SCHEDULE}${classId}.xml`;
  const response = await fetch(url);
  const xmlText = await response.text();
  // Convert the XML text into a XML DOM
  const parser = new DOMParser();
  const xmlDom = parser.parseFromString(xmlText, 'text/xml');

  // Get all VEVENT
  const events = [...xmlDom.querySelectorAll('VEVENT')];

  // Discard all courses that are in the past
  now = new Date();
  const futurEvents = events.filter(event => isInTheFuture(event));

  // Sort events by date
  futurEvents.sort(compareEvents);

  // Transorm them into DOM
  const allDomCourses = [];
  for (const event of futurEvents) {
    allDomCourses.push(tmplCourse(event));
  }

  // Replace the childrens of the tbody with them
  document.querySelector('#schedule').replaceChildren(...allDomCourses);

  // Enable the btn again
  domForEach('.btn-schedule', el => el.removeAttribute('disabled'));
});

function tmplCourse(event) {
  const dateStart = strToDate(event.querySelector('DTSTART').textContent);
  const dateEnd = strToDate(event.querySelector('DTEND').textContent);
  const hoursStart = dateToHours(dateStart);
  const hoursEnd = dateToHours(dateEnd);
  const course = event.querySelector('SUMMARY').textContent;
  const room = event.querySelector('LOCATION').textContent;
  let tmpl = TMPL_COURSE.cloneNode(true);
  tmpl.querySelector('.date').textContent = dateToFrCh(dateStart);
  tmpl.querySelector('.hours').textContent = `${hoursStart} ${hoursEnd}`;
  tmpl.querySelector('.course').textContent = course;
  tmpl.querySelector('.room').textContent = room;
  return tmpl;
}

function compareEvents(event1, event2) {
  let date1 = event1.querySelector('DTSTART').textContent;
  let date2 = event2.querySelector('DTSTART').textContent;
  return date1.localeCompare(date2);
}

function isInTheFuture(event) {
  let dateStart = strToDate(event.querySelector('DTEND').textContent);
  return dateStart > new Date();
}

function strToDate(str){
  return new Date(Date.UTC(
    str.substr(0, 4),
    str.substr(4, 2) - 1,
    str.substr(6, 2),
    str.substr(9, 2),
    str.substr(11, 2),
    str.substr(13, 2)
  ));
}

function dateToFrCh(date) {
  let mapDay = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  let day = date.getDate();
  let dayName = mapDay[date.getDay()];
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  return `${dayName} ${day}.${month}`;
}

function dateToHours(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  return `${hours}:${minutes}`;
}

function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}

function domOn(selector, event, callback, options) {
  domForEach(selector, ele => ele.addEventListener(event, callback, options));
}