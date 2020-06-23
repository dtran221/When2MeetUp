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
  }