eventCreationDetails = {
  "eventName": "eventName",
  "dateOrDay": ["2020-06-23T04:00:00.000Z", "2020-06-24T04:00:00.000Z", "2020-06-25T04:00:00.000Z", "2020-06-26T04:00:00.000Z", "2020-06-27T04:00:00.000Z", "2020-06-28T04:00:00.000Z", "2020-06-29T04:00:00.000Z"],
  "startTime": "9", "endTime": "21", "timeZone": "America/New_York", "commentToAttendees": "commentcomment"
};
var 

function initialSetup() {

  var temp = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var mySelect = document.getElementById("TimeZone");

  for (var i, j = 0; (i = TimeZone.options[j]); j++) {
    if (i.value == temp) {
      TimeZone.selectedIndex = j;
      break;
    }
  }
  var orig = document.getElementById("fillOutAvailabilityHeader");
  duplicateColumnsAndRows();
}

function duplicateColumnsAndRows() {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var header = eventCreationDetails.dateOrDay;
  var startTime = parseInt(eventCreationDetails.startTime);
  var endTime = parseInt(eventCreationDetails.endTime);
  count = 0;
  var container = document.getElementById("availabilityGrid");
  var orig = document.getElementById("fillOutColumnHeader0");
  var cln = orig.cloneNode(true);
  for (var i = 0; i < header.length; i++) {
    var date = new Date(header[i]);
    var previousLocation = document.getElementById("fillOutColumnHeader" + count.toString());
    count++;
    cln.id = orig.id.slice(0, -1) + count.toString();
    cln.classList.add("d-inline-flex")
    cln.classList.add("justify-content-center")
    cln.style.textAlign = "center";
    cln.innerHTML = date.toLocaleDateString() + "<br/>" + weekday[date.getDay()].substring(0,3);
    previousLocation.insertAdjacentElement("afterend", cln);
    cln = orig.cloneNode(true);
  }
  var newDiv = document.createElement("div");
  newDiv.classList.add("w-100");
  container.appendChild(newDiv);
  var timeToShow = startTime;
  var timeToShowId = startTime * 100;
  for (var i = 0; i < endTime - startTime; i++) {
    var timeDiv = document.createElement("div");
    timeDiv.id = "fillOutRowTime" + timeToShowId.toString();
    if (timeToShow > 12) {
      timeDiv.innerHTML = (timeToShow - 12).toString() + " PM"
    }
    else if (timeToShow == 12) {
      timeDiv.innerHTML = timeDiv.innerHTML = timeToShow.toString() + " PM"
    }
    else {
      timeDiv.innerHTML = (timeToShow).toString() + " AM";
    }
    timeDiv.classList.add("d-inline-flex");
    timeDiv.classList.add("justify-content-center");
    timeDiv.classList.add("col");
    timeDiv.classList.add("no-gutters");
    container.appendChild(timeDiv);
    for (var j = 0; j < header.length; j++) {
      var date = new Date(header[j]);
      var fillDiv = document.createElement("div");
      fillDiv.classList.add("col");
      fillDiv.classList.add("border");
      fillDiv.classList.add("border-dark");
      fillDiv.classList.add("no-gutters");
      if (j != (header.length - 1)) {
        fillDiv.classList.add("border-right-0");
      }
      if (i != (endTime - startTime - 1)) {
        fillDiv.classList.add("border-bottom-0");
      }
      fillDiv.id = "fillOutRow" + timeToShowId.toString() + "column" + date.toLocaleDateString();
      container.appendChild(fillDiv);
    }
    var controllWidthDiv = document.createElement("div");
    controllWidthDiv.classList.add("w-100");

    container.appendChild(controllWidthDiv);
    timeToShowId += 100;
    timeToShow += 1;
  }
  timeToShowId = startTime * 100;
  for (var i = 0; i < (header.length); i++) {
    var date = new Date(header[i]);
    for (j = 0; j < endTime - startTime; j++) {
      var selectedTimeDateDiv = document.getElementById("fillOutRow" + timeToShowId.toString() + "column" + date.toLocaleDateString());
      for (var k = 0; k < 4; k++) {
        var fillDiv = document.createElement("div");
        fillDiv.classList.add("h-25");
        if (k == 1) {
          fillDiv.classList.add("halfWayLine");
        }
        fillDiv.id = "fillOutRow" + timeToShowId.toString() + "column" + date.toLocaleDateString();
        fillDiv.value = timeToShowId;
        fillDiv.addEventListener("mousedown",timeSelect)
        fillDiv.addEventListener("mouseup",timeSelect)
        selectedTimeDateDiv.appendChild(fillDiv);
        timeToShowId += 15;
      }
      timeToShowId += 40;
    }
    timeToShowId = startTime * 100;
  }
}

function timeSelect(event) {
  event.target.style.backgroundColor = "red";
}