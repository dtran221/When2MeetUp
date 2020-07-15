const dateToday = moment();
let displayMonth = dateToday.clone();
displayMonth.date(1);
let selectedDates = new Array();


/**
 * Setups the webpage to show the current month and the users timezone
 */
function initialSetup() {
  calendar(dateToday);

  let temp = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let mySelect = document.getElementById("TimeZone");

  for (let i, j = 0; (i = TimeZone.options[j]); j++) {
    if (i.value == temp) {
      TimeZone.selectedIndex = j;
      break;
    }
  }
}

/**
 * 
 * @param {*} btn 
 * @param {*} time 
 */
function changeTime(btn, time) {
  document.getElementById(btn).selectedIndex = time;
  timeCheck();
}

/**
 * 
 */
function displayDaysOfWeek() {
  document.getElementById("calendar").style.display = "none";
  document.getElementById("daysOfWeekDisplay").style.display = "inline-block";
  selectedDates = new Array();
}

/**
 * 
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
 * 
 */
function previousMonth() {
  
  calendar(displayMonth.subtract(1,'month'));
}

/**
 * 
 */
function nextMonth() {
  
  calendar(displayMonth.add(1,'month'));
}

/**
 * 
 * @param {*} labelName 
 * @param {*} buttonClicked 
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

  for (let i = 0; i < checkboxes.length; i++)
    if (checkboxes[i].classList.contains("active")) {
      checkboxes[i].classList.remove("active");
    } else {
      checkboxes[i].classList.add("active");
    }
}

/**
 * 
 * @param {*} inputDate 
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
 * 
 * @param {*} event 
 */
function selectDayByEvent(event) {
  if (event.target.classList.contains("cal-day__day--selected")) {
    event.target.classList.remove("cal-day__day--selected");
    changeSelectedDates(event.target.value);
  } else {
    event.target.classList.add("cal-day__day--selected");
    changeSelectedDates(event.target.value);
  }
}

/**
 * 
 * @param {*} date 
 */
function changeSelectedDates(date) {
  let placeToWrite = document.getElementById("selectedDatesToDisplay");
  let textToDisplay = "";
  if (selectedDates.some(x => moment(x).isSame(date,'day'))) {
    let idx = selectedDates.map(Number).indexOf(+date);
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
  let startRange;
  let endRange;
  for (let i = 0; i < selectedDates.length; i++) {
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
  placeToWrite.innerText = "";
  placeToWrite.innerText = textToDisplay;
}

/**
 * 
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
 * 
 */
function returnToToday() {
  displayMonth = new Date(dateToday.setMonth(dateToday.getMonth()));
  calendar(displayMonth);
}

/**
 * 
 * @param {*} dayOfWeekNum 
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
 * 
 * @param {*} dayElement 
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
 * 
 * @param {*} event 
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
 * 
 */
function selectEntireMonth() {
  for (let dayLoop = 0; dayLoop < 7; dayLoop++) {
    selectCalendarColumn(dayLoop);
  }
}

/**
 * 
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
 * 
 */
function resetSelectedDates() {
  let selectedDateElements = document.querySelectorAll(".cal-day__day--selected");
  for (let i=0; i < selectedDateElements.length; i++) {
    selectedDateElements[i].classList.remove("cal-day__day--selected");
  }
  selectedDates = new Array();
  document.getElementById("selectedDatesToDisplay").innerText = "";
}

initialSetup();