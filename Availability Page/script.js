eventCreationDetails = {
  "eventName": "eventName",
  "dateOrDay": ["2020-06-23T04:00:00.000Z", "2020-06-24T04:00:00.000Z", "2020-06-25T04:00:00.000Z", "2020-06-26T04:00:00.000Z", "2020-06-27T04:00:00.000Z", "2020-06-28T04:00:00.000Z", "2020-06-29T04:00:00.000Z"],
  "startTime": "9", "endTime": "21", "timeZone": "America/New_York", "commentToAttendees": "commentcomment"
};
var ds;
var signedInUser;
var signedInUserPassword;
var availabilitySheet = {};

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
  createAvailabilityGrid();
  createViewGrid();
   ds = new DragSelect({
    selectables: document.getElementsByClassName("selectable-nodes"),
    area: document.getElementById("availabilityGrid"),
    multiSelectMode: true
  });
}

function createAvailabilityGrid() {
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
  var orig = document.getElementById("fillOutColumn0");
  var cln = orig.cloneNode(true);
  for (var i = 0; i < header.length; i++) {
    var date = new Date(header[i]);
    var previousLocation = document.getElementById("fillOutColumn" + count.toString());
    count++;
    cln.id = "fillOutColumn" + count.toString();
    cln.classList.add("d-inline-flex")
    cln.classList.add("justify-content-center")
    cln.classList.add("noSelect");
    cln.style.textAlign = "center";
    cln.innerHTML = date.toLocaleDateString() + "<br/>" + weekday[date.getDay()].substring(0,3);
    cln.value = date;
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
    timeDiv.classList.add("noSelect");
    timeDiv.classList.add("no-gutters");
    container.appendChild(timeDiv);
    for (var j = 1; j < header.length +1; j++) {
      var date = new Date(header[j]);
      var fillDiv = document.createElement("div");
      fillDiv.classList.add("col");
      fillDiv.classList.add("border");
      fillDiv.classList.add("border-dark");
      fillDiv.classList.add("no-gutters");
      if (j != (header.length)) {
        fillDiv.classList.add("border-right-0");
      }
      if (i != (endTime - startTime - 1)) {
        fillDiv.classList.add("border-bottom-0");
      }
      fillDiv.id = "fillOutRow" + (timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString() + "Column" + j.toString();
      container.appendChild(fillDiv);
    }
    var controllWidthDiv = document.createElement("div");
    controllWidthDiv.classList.add("w-100");

    container.appendChild(controllWidthDiv);
    timeToShowId += 100;
    timeToShow += 1;
  }
  
  timeToShowId = startTime * 100;
  for (var i = 1; i < (header.length +1); i++) {
    var rowCount = 0;
    for (j = 0; j < endTime - startTime; j++) {
      var selectedTimeDateDiv = document.getElementById("fillOutRow" + (timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString() + "Column" + i.toString());
      for (var k = 0; k < 4; k++) {
        var fillDiv = document.createElement("div");
        fillDiv.classList.add("h-25");
        if (k == 1) {
          fillDiv.classList.add("halfWayLine");
        }
        fillDiv.id = "fillOutRow" + rowCount.toString() + "Column" + i.toString();
        var dateTimeForValue = document.getElementById("fillOutColumn" + i.toString()).value;
        var hour = parseInt(((timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString()).substring(0,2));
        var minutes = parseInt(((timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString()).substring(2));
        dateTimeForValue.setHours(hour,minutes);
        fillDiv.value = dateTimeForValue;
        fillDiv.addEventListener("mousedown",preventBadSelection);
        fillDiv.classList.add("selectable-nodes");
        selectedTimeDateDiv.appendChild(fillDiv);
        timeToShowId += 15;
        rowCount += 1;
      }
      timeToShowId += 40;
    }
    timeToShowId = startTime * 100;
  }
}


function preventBadSelection(event) {
  event.preventDefault();
}

function displayFillOut() {
  document.getElementById("fillOutAvailability").style.display = "block";
  document.getElementById("viewAvailability").style.display = "none";
}

function displayView() {
  document.getElementById("fillOutAvailability").style.display = "none";
  document.getElementById("viewAvailability").style.display = "block";
  fillOutViewGrid();
}

function selectAll() {
  var selectableNodes = document.getElementsByClassName("selectable-nodes");
  ds.setSelectables(selectableNodes,false,true);
}

function resetSelection() {
  ds.clearSelection();
}

function signInUser() {
  signedInUser = document.getElementById("username").value;
  signedInUserPassword = document.getElementById("password").value;
  //TODO: compare username and passwords for this event, 
  document.getElementById("signInForm").style.display= "none";
  document.getElementById("availabilityForm").style.display= "block";
  
}

function submitAvailabilityForm(){
  var something = ds.getSelection();
  availabilitySheet[signedInUser] = ds.getSelection();
  //TODO: Post data to server
}

function createViewGrid() {
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
  var container = document.getElementById("viewGrid");
  var orig = document.getElementById("viewColumn0");
  var cln = orig.cloneNode(true);
  for (var i = 0; i < header.length; i++) {
    var date = new Date(header[i]);
    var previousLocation = document.getElementById("viewColumn" + count.toString());
    count++;
    cln.id = "viewColumn" + count.toString();
    cln.classList.add("d-inline-flex")
    cln.classList.add("justify-content-center")
    cln.classList.add("noSelect");
    cln.style.textAlign = "center";
    cln.innerHTML = date.toLocaleDateString() + "<br/>" + weekday[date.getDay()].substring(0,3);
    cln.value = date;
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
    timeDiv.id = "viewRowTime" + timeToShowId.toString();
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
    timeDiv.classList.add("noSelect");
    timeDiv.classList.add("no-gutters");
    container.appendChild(timeDiv);
    for (var j = 1; j < header.length +1; j++) {
      var date = new Date(header[j]);
      var fillDiv = document.createElement("div");
      fillDiv.classList.add("col");
      fillDiv.classList.add("border");
      fillDiv.classList.add("border-dark");
      fillDiv.classList.add("no-gutters");
      if (j != (header.length)) {
        fillDiv.classList.add("border-right-0");
      }
      if (i != (endTime - startTime - 1)) {
        fillDiv.classList.add("border-bottom-0");
      }
      fillDiv.id = "viewRow" + (timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString() + "Column" + j.toString();
      container.appendChild(fillDiv);
    }
    var controllWidthDiv = document.createElement("div");
    controllWidthDiv.classList.add("w-100");

    container.appendChild(controllWidthDiv);
    timeToShowId += 100;
    timeToShow += 1;
  }
  
  timeToShowId = startTime * 100;
  for (var i = 1; i < (header.length +1); i++) {
    var rowCount = 0;
    for (j = 0; j < endTime - startTime; j++) {
      var selectedTimeDateDiv = document.getElementById("viewRow" + (timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString() + "Column" + i.toString());
      for (var k = 0; k < 4; k++) {
        var fillDiv = document.createElement("div");
        fillDiv.classList.add("h-25");
        if (k == 1) {
          fillDiv.classList.add("halfWayLine");
        }
        fillDiv.id = "viewRow" + rowCount.toString() + "Column" + i.toString();
        var dateTimeForValue = document.getElementById("viewColumn" + i.toString()).value;
        var hour = parseInt(((timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString()).substring(0,2));
        var minutes = parseInt(((timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString()).substring(2));
        dateTimeForValue.setHours(hour,minutes);
        fillDiv.value = dateTimeForValue;
        fillDiv.addEventListener("mousedown",preventBadSelection);
        selectedTimeDateDiv.appendChild(fillDiv);
        timeToShowId += 15;
        rowCount += 1;
      }
      timeToShowId += 40;
    }
    timeToShowId = startTime * 100;
  }
}

function fillOutViewGrid() {
  for (var key in availabilitySheet) {
    var selectedDateTime = availabilitySheet[key];
    for (var dateTime in selectedDateTime) {
      document.querySelector([value = dateTime]).style.backgroundColor = "green";
    }
    
  }
}