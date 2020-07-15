var dateToday = moment();
var displayMonth = dateToday.date(1);
var selectedDates = new Array();

function initialSetup() {
  calendar(displayMonth);

  var temp = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var mySelect = document.getElementById("TimeZone");

  for (var i, j = 0; (i = TimeZone.options[j]); j++) {
    if (i.value == temp) {
      TimeZone.selectedIndex = j;
      break;
    }
  }
}

function changeTime(btn, time) {
  document.getElementById(btn).selectedIndex = time;
  timeCheck();
}

function displayDaysOfWeek() {
  document.getElementById("calendar").style.display = "none";
  document.getElementById("daysOfWeekDisplay").style.display = "inline-block";
  selectedDates = new Array();
}

function displayCalendar() {
  calendar(displayMonth);
  document.getElementById("selectedDatesToDisplay").innerHTML = "";
  document.getElementById("calendar").style.display = "inline-block";
  document.getElementById("daysOfWeekDisplay").style.display = "none";
  var checkboxes = document.getElementsByName("dayOfTheWeek");
  checkboxes = Array.prototype.slice.call(checkboxes);
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].classList.remove("active");
  }
}

function previousMonth() {
  
  calendar(displayMonth.subtract(1,'month'));
}
function nextMonth() {
  
  calendar(displayMonth.add(1,'month'));
}

function quickSelectButton(labelName, buttonClicked) {
  var checkboxes = document.getElementsByName(labelName);
  checkboxes = Array.prototype.slice.call(checkboxes);
  var start;
  var end;
  var increment;
  if (buttonClicked == "weekday") {
    checkboxes.pop();
    checkboxes.shift();
  } else if (buttonClicked == "weekend") {
    checkboxes.splice(1, 5);
  }

  for (var i = 0; i < checkboxes.length; i++)
    if (checkboxes[i].classList.contains("active")) {
      checkboxes[i].classList.remove("active");
    } else {
      checkboxes[i].classList.add("active");
    }
}
function calendar(inputMonth) {
  var d = inputMonth;
  var weekLoop;
  var dayLoop;
  var dayCount = 1;
  var firstDay = d.startOf('month');
  var dayElementValue = firstDay;
  var lastDay = d.endOf('month');
  var monthAndYear = document.getElementById("calendarTitle");
  monthAndYear.innerHTML = moment(firstDay).format("MMM YYYY")
  for (loop = 0; loop < 6; loop++) {
    var rowDivElement = "row" + loop.toString();
    var dayLoopStart;
    var firstRowElement = document.getElementById(rowDivElement);
    firstRowElement.value = loop;
    firstRowElement.innerHTML = "";
    firstRowElement.addEventListener("click", selectCalendarRow);
    dayElement = firstRowElement.nextElementSibling;
    if (loop == 0) {
      dayLoopStart = moment(firstDay).day();
      for (dayLoop = 0; dayLoop < dayLoopStart; dayLoop++) {
        dayElement.innerHTML = "";
        if (dayElement.classList.contains("cal-day__day--selected")) {
          dayElement.classList.remove("cal-day__day--selected");
        }
        dayElement = dayElement.nextElementSibling;
      }
    } 
    else {
      dayLoopStart = 0;
    }
    for (dayLoop = dayLoopStart; dayLoop < 7; dayLoop++) {
      if (dayElement.classList.contains("cal-day__day--selected") || dayElement.classList.contains("cal-day__day--today")) {
        dayElement.classList.remove("cal-day__day--selected");
        dayElement.classList.remove("cal-day__day--today");
      }
      if (dayCount > moment(lastDay).date()) {
        dayElement.innerHTML = "";
        dayElement = dayElement.nextElementSibling;
      } else {
        dayElement.innerHTML = dayCount;
        dayElement.value = dayElementValue.add(1,'d');
        if (moment(dateToday).isSame(dayElement.value)) {
          dayElement.classList.add("cal-day__day--today");
        }
        if (selectedDates.some(x => x.getTime() == dayElement.value.getTime())) {
          dayElement.classList.add("cal-day__day--selected");
        }
        dayElement.addEventListener("click", selectDayByEvent);
        firstRowElement.innerHTML = "&gt";
        dayCount++;
        dayElement = dayElement.nextElementSibling;
      }
    }
  }
}
function selectDayByEvent(event) {
  if (event.target.classList.contains("cal-day__day--selected")) {
    event.target.classList.remove("cal-day__day--selected");
    changeSelectedDates(event.target.value);
  } else {
    event.target.classList.add("cal-day__day--selected");
    changeSelectedDates(event.target.value);
  }
}



function changeSelectedDates(date) {
  var placeToWrite = document.getElementById("selectedDatesToDisplay");
  var textToDisplay = "";
  if (selectedDates.some(x => moment(x).isSame(date))) {
    var idx = selectedDates.map(Number).indexOf(+date);
    if (idx > -1) {
      selectedDates.splice(idx, 1);
    }
  } 
  else {
    selectedDates.push(date);
  }
  selectedDates = selectedDates.sort(function (date1, date2) {
    return date1.getTime() - date2.getTime();
  });
  var startRange;
  var endRange;
  for (var i = 0; i < selectedDates.length; i++) {
    if (i === selectedDates.length - 1) {
      if (Math.abs(selectedDates[i] - selectedDates[i - 1] === 86400000)) {
        textToDisplay += startRange + " - " + selectedDates[i].toLocaleDateString() + ", ";
        startRange = null;
      }
      else {
        textToDisplay += selectedDates[i].toLocaleDateString() + ", ";
      }
    }
    else {
      if (Math.abs(selectedDates[i + 1] - selectedDates[i]) === 86400000 && startRange == null) {
        startRange = selectedDates[i].toLocaleDateString();
      }
      else if (Math.abs(selectedDates[i + 1] - selectedDates[i]) === 86400000 && startRange != null) {

      }
      else if (Math.abs(selectedDates[i + 1] - selectedDates[i]) > 86400000 && startRange != null) {
        textToDisplay += startRange + " - " + selectedDates[i].toLocaleDateString() + ", ";
        startRange = null;
      }
      else if (Math.abs(selectedDates[i + 1] - selectedDates[i]) > 86400000 && startRange == null) {
        textToDisplay += selectedDates[i].toLocaleDateString() + ", ";
      }
      else {
        textToDisplay += selectedDates[i].toLocaleDateString() + ", ";
      }
    }
  }
  textToDisplay = textToDisplay.substring(0, textToDisplay.length - 2);
  placeToWrite.innerHTML = "";
  placeToWrite.innerHTML = textToDisplay;
}

function timeCheck() {
  var startTime = document.getElementById("StartTime").selectedIndex
  var endTime = document.getElementById("EndTime").selectedIndex
  var startTimeLabel = document.getElementById("startTimeLabel");
  var endTimeLabel = document.getElementById("endTimeLabel");
  var timeWarning = document.getElementById("timeWarning");
  if (endTime <= startTime) {
    startTimeLabel.style.backgroundColor = "#f8d7da";
    endTimeLabel.style.backgroundColor = "#f8d7da";
    timeWarning.classList.add("alert", "alert-danger");
    timeWarning.innerHTML = "Start Time starts after End Time.";
  }
  else {
    startTimeLabel.style.backgroundColor = "";
    endTimeLabel.style.backgroundColor = "";
    timeWarning.classList.remove("alert", "alert-danger");
    timeWarning.innerHTML = "";
  }
}

function returnToToday() {
  displayMonth = new Date(dateToday.setMonth(dateToday.getMonth()));
  calendar(displayMonth);
}

function selectCalendarColumn(dayOfWeekNum) {
  var rowLoop;
  var dayLoop;
  for (rowLoop = 0; rowLoop < 6; rowLoop++) {
    var rowDivElement = "row" + rowLoop.toString();
    var dateElement = document.getElementById(rowDivElement).nextElementSibling;
    for (dayLoop = 0; dayLoop < dayOfWeekNum; dayLoop++) {
      dateElement = dateElement.nextElementSibling;
    }
    selectDayByQuickSelect(dateElement);
  }
}



function selectDayByQuickSelect(dayElement) {
  if (dayElement.classList.contains("cal-day__day--selected")) {
    dayElement.classList.remove("cal-day__day--selected");
    changeSelectedDates(dayElement.value);
  } else if (dayElement.innerHTML != "") {
    dayElement.classList.add("cal-day__day--selected");
    changeSelectedDates(dayElement.value);
  }
}

function selectCalendarRow(event) {
  var dateElement = event.target.nextElementSibling;
  var dayLoop;
  for (dayLoop = 0; dayLoop < 7; dayLoop++) {
    if (dateElement.innerHTML != "") {
      selectDayByQuickSelect(dateElement);
    }
    dateElement = dateElement.nextElementSibling;
  }
}

function selectEntireMonth() {
  for (var dayLoop = 0; dayLoop < 7; dayLoop++) {
    selectCalendarColumn(dayLoop);
  }
}

function submitForm() {
  var preJsonObject = { "eventName": "", "dateOrDay": "", "startTime": "", "endTime": "", "timeZone": "", "commentToAttendees": "" };
  preJsonObject["eventName"] = document.getElementById("eventName").value;
  if (selectedDates && selectedDates.length) {
    preJsonObject["dateOrDay"] = selectedDates;
  }
  else {
    var checked = [];
    var checkboxes = document.getElementsByName("dayOfTheWeek");
    checkboxes = Array.prototype.slice.call(checkboxes);
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].classList.contains("active")) {
        checked.push(checkboxes[i].firstElementChild.value);
      }
    }
    preJsonObject["dateOrDay"] = checked;
  }
  preJsonObject["startTime"] = document.getElementById("StartTime").value;
  preJsonObject["endTime"] = document.getElementById("EndTime").value;
  preJsonObject["timeZone"] = document.getElementById("TimeZone").value;
  preJsonObject["commentToAttendees"] = document.getElementById("commentToAttendees").value;
  preJsonObject["id"] = null;
  const jsonObject = JSON.stringify(preJsonObject);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: jsonObject,
    redirect: 'follow'
  };

  fetch("https://localhost:5001/event", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

function resetSelectedDates() {
  var selectedDateElements = document.querySelectorAll(".cal-day__day--selected");
  for (var i=0; i < selectedDateElements.length; i++) {
    selectedDateElements[i].classList.remove("cal-day__day--selected");
  }
  selectedDates = new Array();
  document.getElementById("selectedDatesToDisplay").innerHTML = "";
}