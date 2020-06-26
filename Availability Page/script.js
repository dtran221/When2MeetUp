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
    var startTime = eventCreationDetails.startTime;
    var endTime = eventCreationDetails.endTime;
    count = 0;
    var container = document.getElementById("fillOutAvailabilityHeader");
    var orig = document.getElementById("fillOutColumnHeader0");
    var cln = orig.cloneNode(true);
    for (var i = 0; i < header.length; i++) {
      date = new Date(header[i]);
      year = date.getFullYear();
      month = date.getMonth()+1;
      dt = date.getDate();
      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      cln.innerHTML = year+'-' + month + '-'+dt;
      var previousLocation = document.getElementById("fillOutColumnHeader" + count.toString());
      count++;
      cln.id = orig.id.slice(0,-1) + count.toString();
      previousLocation.insertAdjacentElement("afterend", cln);
      
    }
  }