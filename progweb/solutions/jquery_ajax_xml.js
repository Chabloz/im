const WS_HORAIRE = "https://chabloz.eu/files/horaires/";
const TMPL_COURSE = $(".template-course").clone().removeClass("template");

const strToDate = str => new Date(Date.UTC(
  str.substr(0, 4),
  str.substr(4, 2) - 1,
  str.substr(6, 2),
  str.substr(9, 2),
  str.substr(11, 2),
  str.substr(13, 2)  
));

const dateToFrCh = date => {
  let mapDay = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  let day = date.getDate();
  let dayName = mapDay[date.getDay()];
  let month = date.getMonth() + 1;  
  let year = date.getFullYear();
  if (month < 10) month = '0' + month;  
  if (day < 10) day = '0' + day;
  return `${dayName} ${day}.${month}`;
};

const dateToHours = date => {  
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) hours = '0' + hours;  
  if (minutes < 10) minutes = '0' + minutes;    
  return `${hours}:${minutes}`;
}

const compareEvents = (event1, event2) => {
  let date1 = $("DTSTART", event1).text();
  let date2 = $("DTSTART", event2).text();
  return date1.localeCompare(date2);
};

const isInTheFuture = event => {  
  let dateStart = strToDate($("DTEND", event).text()); 
  return dateStart > new Date();
};

const tmplCourse = course => {  
  let dateStart = strToDate($("DTSTART", course).text());
  let dateEnd = strToDate($("DTEND", course).text());
  let hoursStart = dateToHours(dateStart);
  let hoursEnd = dateToHours(dateEnd);
  let data = {
    date  : dateToFrCh(dateStart),
    hours : `${hoursStart} ${hoursEnd}`,
    course: $("SUMMARY", course).text(),
    room  : $("LOCATION", course).text()
  };
  let tmpl = TMPL_COURSE.clone();
  $.each(data, (key, val) => tmpl.find(`.${key}`).text(val));
  return tmpl;  
};

const tmplBufferCourses = (buffer, course) => buffer.append(tmplCourse(course));

const loadSchedule = classId => {
  classId = classId || localStorage.getItem('classId');
  if (!classId) return;  
  $(".btn-schedule").removeClass("selected").prop("disabled", true);
  $(`.btn-schedule[data-class-id='${classId}']`).addClass("selected");  
  $.ajax({url: `${WS_HORAIRE}${classId}.xml`})
    .then(xml => $("VEVENT", xml).toArray())
    .then(events => events.sort(compareEvents))
    .then(events => events.filter(isInTheFuture))
    .then(events => events.reduce(tmplBufferCourses, $("<tbody>")))
    .then(tbody => $("#schedule tbody").replaceWith(tbody))
    .catch(error => alert('Error. Try again later.'))
    .then(() => $(".btn-schedule").prop("disabled", false));
}

$(".btn-schedule").on("click", (event) => {
  let classId = $(event.currentTarget).data("class-id");
  localStorage.setItem('classId', classId);
  loadSchedule(classId);
});

loadSchedule();
