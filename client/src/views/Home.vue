<template>
  <v-container class="home">
    <v-row justify="center">
      <v-text-field
        v-model="eventName"
        label="Event Name"
        placeholder="Study Night"
        outlined
        clearable
        required
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <h1>Potential dates/days for the event</h1>
    </v-row>
    <v-row justify="center">
      <v-btn-toggle v-model="dateDayToggle" mandatory>
        <v-btn value="Dates in a Month">Dates in a Month</v-btn>
        <v-btn value="Days of the Week">Days of the Week</v-btn>
      </v-btn-toggle>
    </v-row>
    <v-row justify="center">
      <v-container v-if="dateDayToggle === 'Dates in a Month'">placeholder for dates in month</v-container>
      <v-container v-else>
        <v-row justify="center" class= "mb-3">
          <v-btn-toggle v-model="selectedDates" multiple>
            <v-btn value="Sun Jan 13 1980 00:00:00 GMT-0500 (Eastern Standard Time)">Sun</v-btn>
            <v-btn value="Mon Jan 14 1980 00:00:00 GMT-0500 (Eastern Standard Time)">Mon</v-btn>
            <v-btn value="Tue Jan 15 1980 00:00:00 GMT-0500 (Eastern Standard Time)">Tue</v-btn>
            <v-btn value="Wed Jan 16 1980 00:00:00 GMT-0500 (Eastern Standard Time)">Wed</v-btn>
            <v-btn value="Thu Jan 17 1980 00:00:00 GMT-0500 (Eastern Standard Time)">Thu</v-btn>
            <v-btn value="Fri Jan 18 1980 00:00:00 GMT-0500 (Eastern Standard Time)">Fri</v-btn>
            <v-btn value="Sat Jan 19 1980 00:00:00 GMT-0500 (Eastern Standard Time)">Sat</v-btn>
          </v-btn-toggle>
        </v-row>
        <v-row justify="center">
          <v-btn-toggle v-model="toggle_exclusive">
            <v-btn v-on:click="selectAllDaysOfWeek()">All</v-btn>
            <v-btn v-on:click="selectWeekdays()">Weekdays</v-btn>
            <v-btn v-on:click="selectWeekend()">Weekend</v-btn>
          </v-btn-toggle>
        </v-row>
      </v-container>
    </v-row>
    <v-row justify="center">
      <v-select :items="timeSelect" label="Start Time: " v-model="startTime" outlined></v-select>
    </v-row>
    <v-row justify="center">
      <v-select :items="timeSelect" label="End Time: " v-model="endTime" outlined></v-select>
    </v-row>
    <v-row justify="center">
      <v-select :items="timeZones" label="Time Zone: " v-model="selectedTimeZone" outlined></v-select>
    </v-row>
    <v-row justify="center">
      <v-textarea
        outlined
        name="input-7-4"
        label="Comment for Attendees"
        v-model="commentFromCreator"
      ></v-textarea>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "Home",
  data() {
    return {
      eventName: "",
      startTime: "9 AM",
      endTime: "9 PM",
      timeZone: "",
      commentFromCreator: "",
      dateDayToggle: "Dates in a Month",
      timeSelect: [
        "12 AM",
        "1 AM",
        "2 AM",
        "3 AM",
        "4 AM",
        "5 AM",
        "6 AM",
        "7 AM",
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "1 PM",
        "2 PM",
        "3 PM",
        "4 PM",
        "5 PM",
        "6 PM",
        "7 PM",
        "8 PM",
        "9 PM",
        "10 PM",
        "11 PM",
        "12 AM",
      ],
      timeZones: [],
      selectedTimeZone: "",
      selectedDates: [],
    };
  },
  created() {
    this.timeZones = moment.tz.names();
    this.selectedTimeZone = moment.tz.guess(true);
  },
  methods: {
    selectAllDaysOfWeek() {
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Sun Jan 13 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Mon Jan 14 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Tue Jan 15 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Wed Jan 16 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Thu Jan 17 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Fri Jan 18 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Sat Jan 19 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
    },
    selectWeekdays() {
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Mon Jan 14 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Tue Jan 15 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Wed Jan 16 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Thu Jan 17 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Fri Jan 18 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
    },
    selectWeekend() {
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Sun Jan 13 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDatesItem(
        this.selectedDates,
        "Sat Jan 19 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
    },
    toggleSelectedDatesItem(inputArray, inputValue) {
      let valueIndex = inputArray.indexOf(inputValue);
      if (valueIndex === -1) {
        inputArray.push(inputValue);
      } else {
        inputArray.splice(valueIndex, 1);
      }
    },
  },
};
</script>
