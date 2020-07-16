const dateToday = moment();
let displayMonth = dateToday.clone();
displayMonth.date(1);
let selectedDates = new Array();


/**
 * Setups the webpage to show the current month and the users timezone
 */
function initialSetup() {
  calendar(dateToday);

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
}

/**
 * Button to quick select a start time or end time
 * @param {string} btn The input (start time or end time) the button changes
 * @param {number} time The time the button changes the input to
 */
function changeTime(btn, time) {
  document.getElementById(btn).selectedIndex = time;
  timeCheck();
}

/**
 * Displays the days of the week selector and hides the calendar. Resets selected dates on calendar.
 */
function displayDaysOfWeek() {
  document.getElementById("calendar").style.display = "none";
  document.getElementById("daysOfWeekDisplay").style.display = "inline-block";
  selectedDates = new Array();
}

/**
 * Displays the calendar selector and hides the days of the week selector. Resets selected dates on days of the week.
 */
function displayCalendar() {
  calendar(displayMonth);
  document.getElementById("selectedDatesToDisplay").innerText = "";
  document.getElementById("calendar").style.display = "inline-block";
  document.getElementById("daysOfWeekDisplay").style.display = "none";
  let checkboxes = document.getElementsByName("dayOfTheWeek");
  checkboxes = Array.prototype.slice.call(checkboxes);
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].classList.remove("active");
  }
}

/**
 * Changes display month to the previous month
 */
function previousMonth() {
  
  calendar(displayMonth.subtract(1,'month'));
}

/**
 * Changes display month to the next month
 */
function nextMonth() {
  
  calendar(displayMonth.add(1,'month'));
}

/**
 * Button to quick select for the days of the week
 * @param {string} labelName element that should be changed based on quick select button
 * @param {string} buttonClicked which elements will be changed 
 */
function quickSelectButton(labelName, buttonClicked) {
  let checkboxes = document.getElementsByName(labelName);
  checkboxes = Array.prototype.slice.call(checkboxes);
  let start;
  let end;
  let increment;
  if (buttonClicked == "weekday") {
    checkboxes.pop();
    checkboxes.shift();
  } else if (buttonClicked == "weekend") {
    checkboxes.splice(1, 5);
  }

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].classList.toggle("active");
  }
      
}

/**
 * Produces the calendar and adds the click events to the created dates
 * @param {Date} inputDate Moment object for the month that will be displayed
 */
function calendar(inputDate) {
  let weekLoop;
  let dayLoop;
  let dayCount = 1;
  const firstDay = moment(inputDate).startOf('month');
  let dayElementValue = moment(firstDay);
  const lastDay = moment(inputDate).endOf('month');
  let monthAndYear = document.getElementById("calendarTitle");
  monthAndYear.innerText = firstDay.format("MMM YYYY")
  for (loop = 0; loop < 6; loop++) {
    let rowDivElement = "row" + loop.toString();
    let dayLoopStart;
    let firstRowElement = document.getElementById(rowDivElement);
    firstRowElement.value = loop;
    firstRowElement.innerText = "";
    firstRowElement.addEventListener("click", selectCalendarRow);
    dayElement = firstRowElement.nextElementSibling;
    if (loop == 0) {
      dayLoopStart = moment(firstDay).day();
      for (dayLoop = 0; dayLoop < dayLoopStart; dayLoop++) {
        dayElement.innerText = "";
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
      if (dayCount > lastDay.date()) {
        dayElement.innerText = "";
        dayElement = dayElement.nextElementSibling;
      } else {
        dayElement.innerText = dayCount;
        dayElement.value = moment(dayElementValue);
        dayElementValue.add(1,'d');
        if (dateToday.isSame(dayElement.value,'day')) {
          dayElement.classList.add("cal-day__day--today");
        }
        if (selectedDates.some(x => x.isSame(dayElement.value,'day'))) {
          dayElement.classList.add("cal-day__day--selected");
        }
        dayElement.addEventListener("click", selectDayByEvent);
        firstRowElement.innerText = ">";
        dayCount++;
        dayElement = dayElement.nextElementSibling;
      }
    }
  }
}

/**
 * Adds and removes class on selected dates
 * @param {object} event contains data on selected dates
 */
function selectDayByEvent(event) {
  event.target.classList.toggle("cal-day__day--selected")
  changeSelectedDates(event.target.value);
}

/**
 * creates and edits a string to display which dates are selected
 * @param {Date} date Moment object to be added to string 
 */
function changeSelectedDates(date) {
  let placeToWrite = document.getElementById("selectedDatesToDisplay");
  let textToDisplay = "";
  if (selectedDates.some(x => moment(x).isSame(date,'day'))) {
    let idx = selectedDates.indexOf(date);
    if (idx > -1) {
      selectedDates.splice(idx, 1);
    }
  } 
  else {
    selectedDates.push(date);
  }
  selectedDates = selectedDates.sort((a, b) => a.diff(b));
  let startRange;
  let endRange;
  for (let i = 0; i < selectedDates.length; i++) {
    if (i === selectedDates.length - 1) {
      if (selectedDates[i].diff(selectedDates[i -1],'days') === 1) {
        textToDisplay += startRange + " - " + selectedDates[i].format("M/D/YYYY") + ", ";
        startRange = null;
      }
      else {
        textToDisplay += selectedDates[i].format("M/D/YYYY") + ", ";
      }
    }
    else {
      if (selectedDates[i + 1].diff(selectedDates[i],'days') === 1 && startRange == null) {
        startRange = selectedDates[i].format("M/D/YYYY");
      }
      else if (selectedDates[i + 1].diff(selectedDates[i],'days') === 1 && startRange != null) {

      }
      else if (selectedDates[i + 1].diff(selectedDates[i],'days') > 1 && startRange != null) {
        textToDisplay += startRange + " - " + selectedDates[i].format("M/D/YYYY") + ", ";
        startRange = null;
      }
      else if (selectedDates[i + 1].diff(selectedDates[i],'days') > 1 && startRange == null) {
        textToDisplay += selectedDates[i].format("M/D/YYYY") + ", ";
      }
      else {
        textToDisplay += selectedDates[i].format("M/D/YYYY") + ", ";
      }
    }
  }
  textToDisplay = textToDisplay.substring(0, textToDisplay.length - 2);
  placeToWrite.innerText = "";
  placeToWrite.innerText = textToDisplay;
}

/**
 * checks if start time is after end time
 */
function timeCheck() {
  let startTime = document.getElementById("StartTime").selectedIndex
  let endTime = document.getElementById("EndTime").selectedIndex
  let startTimeLabel = document.getElementById("startTimeLabel");
  let endTimeLabel = document.getElementById("endTimeLabel");
  let timeWarning = document.getElementById("timeWarning");
  if (endTime <= startTime) {
    startTimeLabel.style.backgroundColor = "#f8d7da";
    endTimeLabel.style.backgroundColor = "#f8d7da";
    timeWarning.classList.add("alert", "alert-danger");
    timeWarning.innerText = "Start Time starts after End Time.";
  }
  else {
    startTimeLabel.style.backgroundColor = "";
    endTimeLabel.style.backgroundColor = "";
    timeWarning.classList.remove("alert", "alert-danger");
    timeWarning.innerText = "";
  }
}

/**
 * produces calendar for the current month
 */
function returnToToday() {
  calendar(dateToday);
}

/**
 * selects all dates in a column
 * @param {number} dayOfWeekNum column of the dates that will be selected or deselected
 */
function selectCalendarColumn(dayOfWeekNum) {
  let rowLoop;
  let dayLoop;
  for (rowLoop = 0; rowLoop < 6; rowLoop++) {
    let rowDivElement = "row" + rowLoop.toString();
    let dateElement = document.getElementById(rowDivElement).nextElementSibling;
    for (dayLoop = 0; dayLoop < dayOfWeekNum; dayLoop++) {
      dateElement = dateElement.nextElementSibling;
    }
    selectDayByQuickSelect(dateElement);
  }
}

/**
 * adds or removes class for a selected date 
 * @param {Node} dayElement date that will have class added or removed
 */
function selectDayByQuickSelect(dayElement) {
  if (dayElement.classList.contains("cal-day__day--selected")) {
    dayElement.classList.remove("cal-day__day--selected");
    changeSelectedDates(dayElement.value);
  } else if (dayElement.innerText != "") {
    dayElement.classList.add("cal-day__day--selected");
    changeSelectedDates(dayElement.value);
  }
}

/**
 * selects or deselects dates in a row
 * @param {object} event contains data on selected dates
 */
function selectCalendarRow(event) {
  let dateElement = event.target.nextElementSibling;
  let dayLoop;
  for (dayLoop = 0; dayLoop < 7; dayLoop++) {
    if (dateElement.innerText != "") {
      selectDayByQuickSelect(dateElement);
    }
    dateElement = dateElement.nextElementSibling;
  }
}

/**
 * selects or deselects entire month
 */
function selectEntireMonth() {
  for (let dayLoop = 0; dayLoop < 7; dayLoop++) {
    selectCalendarColumn(dayLoop);
  }
}

/**
 * sends data to server
 */
function submitForm() {
  let preJsonObject = { "eventName": "", "dateOrDay": "", "startTime": "", "endTime": "", "timeZone": "", "commentToAttendees": "" };
  preJsonObject["eventName"] = document.getElementById("eventName").value;
  if (selectedDates && selectedDates.length) {
    preJsonObject["dateOrDay"] = selectedDates;
  }
  else {
    let checked = [];
    let checkboxes = document.getElementsByName("dayOfTheWeek");
    checkboxes = Array.prototype.slice.call(checkboxes);
    for (let i = 0; i < checkboxes.length; i++) {
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
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
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

/**
 * removes all selected dates
 */
function resetSelectedDates() {
  let selectedDateElements = document.querySelectorAll(".cal-day__day--selected");
  for (let i=0; i < selectedDateElements.length; i++) {
    selectedDateElements[i].classList.remove("cal-day__day--selected");
  }
  selectedDates = new Array();
  document.getElementById("selectedDatesToDisplay").innerText = "";
}

  
document.addEventListener('DOMContentLoaded',() => {
  initialSetup();
});
