eventCreationDetails = {
  "eventName": "eventName",
  "dateOrDay": ["2020-06-23T04:00:00.000Z", "2020-06-24T04:00:00.000Z", "2020-06-25T04:00:00.000Z", "2020-06-26T04:00:00.000Z", "2020-06-27T04:00:00.000Z", "2020-06-28T04:00:00.000Z", "2020-06-29T04:00:00.000Z"],
  "startTime": "9", "endTime": "21", "timeZone": "America/New_York", "commentToAttendees": "commentcomment"
};
let ds;
let signedInUser;
let signedInUserPassword;
let availabilitySheet = {};

function initialSetup() {

  let timeZoneList = moment.tz.names();
  let timeZoneSelect = document.getElementById("timeZone");
  let userTimeZone = moment.tz.guess(Boolean);

  for (let zone of timeZoneList) {
    let selectOption = document.createElement('option');
    selectOption.textContent = zone;
    selectOption.value = zone;
    timeZoneSelect.appendChild(selectOption);
  }
  timeZoneSelect.selectedIndex = timeZoneList.indexOf(userTimeZone);

  createAvailabilityGrid();
  createViewGrid();
   ds = new DragSelect({
    selectables: document.getElementsByClassName("selectable-nodes"),
    area: document.getElementById("availabilityGrid"),
    multiSelectMode: true
  });
}

function createAvailabilityGrid() {
  let dates = eventCreationDetails.dateOrDay;
  let startTime = parseInt(eventCreationDetails.startTime);
  let endTime = parseInt(eventCreationDetails.endTime);
  count = 0;
  let container = document.getElementById("availabilityGrid");
  let orig = document.getElementById("fillOutColumn0");
  let cln = orig.cloneNode(true);
  for (let i = 0; i < dates.length; i++) {
    let date = moment(Date(dates[i]));
    let previousLocation = document.getElementById("fillOutColumn" + count.toString());
    count++;
    cln.id = "fillOutColumn" + count.toString();
    cln.classList.add("d-inline-flex")
    cln.classList.add("justify-content-center")
    cln.classList.add("noSelect");
    cln.style.textAlign = "center";
    cln.innertext = date.format("M/D/YYYY") + "<br/>" + date.format("ddd");
    cln.value = date;
    previousLocation.insertAdjacentElement("afterend", cln);
    cln = orig.cloneNode(true);
  }
  let newDiv = document.createElement("div");
  newDiv.classList.add("w-100");
  container.appendChild(newDiv);
  let timeToShow = startTime;
  let timeToShowId = startTime * 100;
  for (let i = 0; i < endTime - startTime; i++) {
    let timeDiv = document.createElement("div");
    timeDiv.id = "fillOutRowTime" + timeToShowId.toString();
    if (timeToShow > 12) {
      timeDiv.innertext = (timeToShow - 12).toString() + " PM"
    }
    else if (timeToShow == 12) {
      timeDiv.innertext = timeToShow.toString() + " PM"
    }
    else {
      timeDiv.innertext = (timeToShow).toString() + " AM";
    }
    timeDiv.classList.add("d-inline-flex");
    timeDiv.classList.add("justify-content-center");
    timeDiv.classList.add("col");
    timeDiv.classList.add("noSelect");
    timeDiv.classList.add("no-gutters");
    container.appendChild(timeDiv);
    for (let j = 1; j < dates.length +1; j++) {
      let date = moment(Date(dates[j]));
      let fillDiv = document.createElement("div");
      fillDiv.classList.add("col");
      fillDiv.classList.add("border");
      fillDiv.classList.add("border-dark");
      fillDiv.classList.add("no-gutters");
      if (j != (dates.length)) {
        fillDiv.classList.add("border-right-0");
      }
      if (i != (endTime - startTime - 1)) {
        fillDiv.classList.add("border-bottom-0");
      }
      fillDiv.id = "fillOutRow" + (timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString() + "Column" + j.toString();
      container.appendChild(fillDiv);
    }
    let controllWidthDiv = document.createElement("div");
    controllWidthDiv.classList.add("w-100");

    container.appendChild(controllWidthDiv);
    timeToShowId += 100;
    timeToShow += 1;
  }
  
  timeToShowId = startTime * 100;
  for (let i = 1; i < (dates.length +1); i++) {
    let divId = moment(dates[i]);
    let rowCount = 0;
    divId.hour(startTime);
    for (let j = 0; j < endTime - startTime; j++) {
      
      let selectedTimeDateDiv = document.getElementById("fillOutRow" + (timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString() + "Column" + i.toString());
      for (let k = 0; k < 4; k++) {
        let fillDiv = document.createElement("div");
        fillDiv.classList.add("h-25");
        if (k == 1) {
          fillDiv.classList.add("halfWayLine");
        }
        fillDiv.id = "fillOutRow" + rowCount.toString() + "Column" + i.toString();
        let something = document.getElementById("fillOutColumn" + i.toString())
        let dateTimeForValue = something.value;
        let hour = parseInt(((timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString()).substring(0,2));
        let minutes = parseInt(((timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString()).substring(2));
        dateTimeForValue.setHours(hour,minutes);
        fillDiv.value = dateTimeForValue;
        fillDiv.addEventListener("mousedown",(event) => event.preventDefault());
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
  let selectableNodes = document.getElementsByClassName("selectable-nodes");
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
  let something = ds.getSelection();
  availabilitySheet[signedInUser] = ds.getSelection();
  //TODO: Post data to server
}

function createViewGrid() {
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  let header = eventCreationDetails.dateOrDay;
  let startTime = parseInt(eventCreationDetails.startTime);
  let endTime = parseInt(eventCreationDetails.endTime);
  count = 0;
  let container = document.getElementById("viewGrid");
  let orig = document.getElementById("viewColumn0");
  let cln = orig.cloneNode(true);
  for (let i = 0; i < header.length; i++) {
    let date = new Date(header[i]);
    let previousLocation = document.getElementById("viewColumn" + count.toString());
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
  let newDiv = document.createElement("div");
  newDiv.classList.add("w-100");
  container.appendChild(newDiv);
  let timeToShow = startTime;
  let timeToShowId = startTime * 100;
  for (let i = 0; i < endTime - startTime; i++) {
    let timeDiv = document.createElement("div");
    timeDiv.id = "viewRowTime" + timeToShowId.toString();
    if (timeToShow > 12) {
      timeDiv.innertext = (timeToShow - 12).toString() + " PM"
    }
    else if (timeToShow == 12) {
      timeDiv.innertext = timeToShow.toString() + " PM"
    }
    else {
      timeDiv.innertext = (timeToShow).toString() + " AM";
    }
    timeDiv.classList.add("d-inline-flex");
    timeDiv.classList.add("justify-content-center");
    timeDiv.classList.add("col");
    timeDiv.classList.add("noSelect");
    timeDiv.classList.add("no-gutters");
    container.appendChild(timeDiv);
    for (let j = 1; j < header.length +1; j++) {
      let date = new Date(header[j]);
      let fillDiv = document.createElement("div");
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
    let controllWidthDiv = document.createElement("div");
    controllWidthDiv.classList.add("w-100");

    container.appendChild(controllWidthDiv);
    timeToShowId += 100;
    timeToShow += 1;
  }
  
  timeToShowId = startTime * 100;
  for (let i = 1; i < (header.length +1); i++) {
    let rowCount = 0;
    for (j = 0; j < endTime - startTime; j++) {
      let selectedTimeDateDiv = document.getElementById("viewRow" + (timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString() + "Column" + i.toString());
      for (let k = 0; k < 4; k++) {
        let fillDiv = document.createElement("div");
        fillDiv.classList.add("h-25");
        if (k == 1) {
          fillDiv.classList.add("halfWayLine");
        }
        fillDiv.id = "viewRow" + rowCount.toString() + "Column" + i.toString();
        let dateTimeForValue = document.getElementById("viewColumn" + i.toString()).value;
        let hour = parseInt(((timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString()).substring(0,2));
        let minutes = parseInt(((timeToShowId.toString().length == 3 ? "0":"") + timeToShowId.toString()).substring(2));
        dateTimeForValue.setHours(hour,minutes);
        fillDiv.value = dateTimeForValue;
        fillDiv.addEventListener("mousedown",(event) => event.preventDefault());
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
  for (let key in availabilitySheet) {
    let selectedDateTime = availabilitySheet[key];
    for (let dateTime in selectedDateTime) {
      document.querySelector([value = dateTime]).style.backgroundColor = "green";
    }
    
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initialSetup();
});