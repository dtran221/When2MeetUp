eventCreationDetails = { "eventName": "eventName",
 "dateOrDay": ["2020-06-23T04:00:00.000Z","2020-06-24T04:00:00.000Z","2020-06-25T04:00:00.000Z","2020-06-26T04:00:00.000Z","2020-06-27T04:00:00.000Z","2020-06-28T04:00:00.000Z","2020-06-29T04:00:00.000Z"],
  "startTime": "9", "endTime": "21","timeZone": "America/New_York", "commentToAttendees": "commentcomment" };

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
    var header = eventCreationDetails.dateOrDay;
    var startTime = parseInt(eventCreationDetails.startTime);
    var endTime = parseInt(eventCreationDetails.endTime);
    count = 0;
    var container = document.getElementById("fillOutAvailability");
    var orig = document.getElementById("fillOutColumnHeader0");
    var cln = orig.cloneNode(true);
    for (var i = 0; i < header.length; i++) {
      date = new Date(header[i]);
      var previousLocation = document.getElementById("fillOutColumnHeader" + count.toString());
      count++;
      cln.id = orig.id.slice(0,-1) + count.toString();
      cln.classList.add("d-inline-flex")
      cln.classList.add("justify-content-center")
      cln.innerHTML = date.toLocaleDateString();
      previousLocation.insertAdjacentElement("afterend", cln);
      cln = orig.cloneNode(true);
    }
    var newDiv = document.createElement("div");
    newDiv.classList.add("w-100");
    container.appendChild(newDiv);
    var timeToShow = startTime;
    var timeToShowId = startTime*100;
    for  (var i = 0; i < endTime - startTime;i++) {
      var timeDiv = document.createElement("div");
      timeDiv.id = "fillOutRowTime" + timeToShowId.toString();
      timeDiv.innerHTML = (timeToShow >12 ? (timeToShow-12).toString() +" PM" : (timeToShow).toString() + " AM");
      timeDiv.classList.add("col");
      container.appendChild(timeDiv);
      for (var j = 0; j < header.length; j++) {
        date = new Date(header[j]);
        var fillDiv = document.createElement("div");
        fillDiv.classList.add("availabilityGrid");
        fillDiv.classList.add("col");
        fillDiv.classList.add("border");
        fillDiv.classList.add("border-dark");
        fillDiv.id = "fillOutRow" + timeToShowId.toString() + "column" + date.toLocaleDateString();
        container.appendChild(fillDiv);
      }
      var controllWidthDiv = document.createElement("div");
      controllWidthDiv.classList.add("w-100");
      container.appendChild(controllWidthDiv);
      timeToShowId += 100;
      timeToShow += 1;
    }
    

  }