eventCreationDetails = {
  "eventName": "eventName",
  "dateOrDay": ["2020-06-23T04:00:00.000Z", "2020-06-24T04:00:00.000Z", "2020-06-25T04:00:00.000Z", "2020-06-26T04:00:00.000Z", "2020-06-27T04:00:00.000Z", "2020-06-28T04:00:00.000Z", "2020-06-29T04:00:00.000Z"],
  "startTime": "9", "endTime": "21", "timeZone": "America/New_York", "commentToAttendees": "commentcomment"
};
var rowFromHere;
var colFromHere;
var rowToHere;
var colToHere;
var colorTo;
var isDown = false;
var ds;

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
   ds = new DragSelect({
    selectables: document.getElementsByClassName("selectable-nodes"),
    area: document.getElementById("availabilityGrid"),
    multiSelectMode: true
  });
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
        fillDiv.addEventListener("mousedown",fromHere);
        //fillDiv.addEventListener("mousemove",showGreen);
        fillDiv.addEventListener("mouseup",toHere);
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

// function showGreen(event) {
//   var makeColor;
//   if (isDown === true) {
//     event.target.style.backgroundColor = colorTo;
//   }
// }

function fromHere(event) {
  event.preventDefault();
  isDown = true;
  if (event.target.style.backgroundColor != "green") {
    colorTo = "green";
  }
  else {
    colorTo = "white";
  }
  var idString = event.target.id;
  rowFromHere = parseInt(event.target.id.substring(idString.indexOf("Row")+"row".length,idString.indexOf("Col")));
  colFromHere = parseInt(event.target.id.substring(idString.indexOf("Col")+"column".length,idString.length));
}

function toHere(event) {
  isDown = false;
  var idString = event.target.id;
  rowToHere = parseInt(event.target.id.substring(idString.indexOf("Row")+"row".length,idString.indexOf("Col")));
  colToHere = parseInt(event.target.id.substring(idString.indexOf("Col")+"column".length,idString.length));
  var something = ds.getSelection();
  //fillInAvailability();
}

// function fillInAvailability(){
//   var startCol;
//   var endCol;
//   var startRow;
//   var endRow;
//   if (colToHere < colFromHere) {
//     startCol = colToHere;
//     endCol = colFromHere;
//   }
//   else {
//     startCol = colFromHere;
//     endCol = colToHere;
//   }
//   if (rowToHere < rowFromHere) {
//     startRow = rowToHere;
//     endRow = rowFromHere;
//   }
//   else {
//     startRow = rowFromHere;
//     endRow = rowToHere;
//   }
//   var startRowElement = document.getElementById("fillOutRow" + startRow.toString() + "Column" + startCol.toString());
//   var endRowElement = document.getElementById("fillOutRow" + endRow.toString() + "Column" + endCol.toString())
//   var currentElement = startRowElement;
//   var currentElementRow = startRow;
//   var currentElementCol = startCol;
//   while (currentElement != endRowElement) {
//     currentElement.style.backgroundColor = colorTo;
//     var idString = currentElement.id;
//     if (parseInt(idString.substring(idString.indexOf("Col")+"column".length,idString.length)) == endCol){
//       currentElementCol = startCol;
//       currentElementRow += 1;
//     }
//     else {
//       currentElementCol += 1;
//     }
    
    
//     currentElement = document.getElementById("fillOutRow" + currentElementRow.toString() + "Column" + currentElementCol.toString());
//   }
//   endRowElement.style.backgroundColor = colorTo;
// }

function displayFillOut() {
  document.getElementById("fillOutAvailability").style.display = "block";
  document.getElementById("viewAvailability").style.display = "none";
}

function displayView() {
  document.getElementById("fillOutAvailability").style.display = "none";
  document.getElementById("viewAvailability").style.display = "block";
}

function selectAll() {
  var something = ds.addSelectables(ds.selectables,true);
  something;
}

function resetSelection() {
  ds.clearSelection();
}
