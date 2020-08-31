<template>
  <v-container class="home">
    <v-form ref="form" v-model="valid">
      <v-row justify="center">
        <v-col cols="9">
          <v-text-field
            v-model="eventName"
            label="Event Name"
            outlined
            clearable
            required
            :rules="[v => !!v || 'Event Name is required']"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <h1>Potential dates/days for the event</h1>
      </v-row>
      <v-row justify="center" class="mb-3">
        <v-btn-toggle v-model="dateDayToggle" mandatory>
          <v-btn value="Dates in a Month" v-on:click="clearDatesOrDays()">Dates in a Month</v-btn>
          <v-btn value="Days of the Week" v-on:click="clearDatesOrDays()">Days of the Week</v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row justify="center">
        <v-container v-if="dateDayToggle === 'Dates in a Month'">
          <v-row justify="center" class="mb-3">
            <v-date-picker
              :landscape="$vuetify.breakpoint.smAndUp"
              :min="minimumDate"
              :scrollable="true"
              v-model="selectedDates"
              multiple
              required
            ></v-date-picker>
          </v-row>
          <v-row justify="center">
            <v-btn-toggle>
              <v-btn v-on:click="resetSelectedDates()">Reset</v-btn>
            </v-btn-toggle>
          </v-row>
        </v-container>
        <v-container v-else>
          <v-row justify="center" class="mb-3">
            <v-btn-toggle v-model="selectedDays" multiple :rules="dateRules">
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
            <v-btn-toggle>
              <v-btn v-on:click="selectAllDaysOfWeek()">All</v-btn>
              <v-btn v-on:click="selectWeekdays()">Weekdays</v-btn>
              <v-btn v-on:click="selectWeekend()">Weekend</v-btn>
            </v-btn-toggle>
          </v-row>
        </v-container>
        <v-alert type="error" v-if="dateAlert">{{dateAlert}}</v-alert>
      </v-row>

      <v-row justify="center">
        <v-col cols="9">
          <v-select
            :items="timeSelect"
            label="Start Time: "
            v-model="startTime"
            outlined
            required
            :rules="[v => !!v || 'Start Time is required']"
          ></v-select>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="9">
          <v-select
            :items="timeSelect"
            label="End Time: "
            v-model="endTime"
            outlined
            required
            :rules="[v => !!v || 'End Time is required']"
          ></v-select>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="9">
          <v-select
            :items="timeZones"
            label="Time Zone: "
            v-model="selectedTimeZone"
            outlined
            required
            :rules="[v => !!v || 'Time Zone is required']"
          ></v-select>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="9">
          <v-textarea
            outlined
            name="input-7-4"
            label="Comment for Attendees"
            v-model="commentFromCreator"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn :disabled="(!valid || dateAlert != '')" color="success" class="mr-4" @click="validate">Submit</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "Home",
  data() {
    return {
      valid: true,
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
      selectedDays: [],
      minimumDate: moment().toISOString(),
    };
  },
  created() {
    this.timeZones = moment.tz.names();
    this.selectedTimeZone = moment.tz.guess(true);
  },
  methods: {
    selectAllDaysOfWeek() {
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Sun Jan 13 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Mon Jan 14 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Tue Jan 15 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Wed Jan 16 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Thu Jan 17 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Fri Jan 18 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Sat Jan 19 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
    },
    selectWeekdays() {
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Mon Jan 14 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Tue Jan 15 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Wed Jan 16 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Thu Jan 17 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Fri Jan 18 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
    },
    selectWeekend() {
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Sun Jan 13 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
      this.toggleSelectedDaysItem(
        this.selectedDays,
        "Sat Jan 19 1980 00:00:00 GMT-0500 (Eastern Standard Time)"
      );
    },
    toggleSelectedDaysItem(inputArray, inputValue) {
      let valueIndex = inputArray.indexOf(inputValue);
      if (valueIndex === -1) {
        inputArray.push(inputValue);
      } else {
        inputArray.splice(valueIndex, 1);
      }
    },
    clearDatesOrDays() {
      if (this.dateDayToggle === "Dates in a Month") {
        this.selectedDays = [];
      } else {
        this.selectedDates = [];
      }
    },
    resetSelectedDates() {
      this.selectedDates = [];
    },
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        console.log("valid is true");
      }
    },
    reset() {
      this.$refs.form.reset();
      this.selectedDates = [];
      this.selectedDays = [];
    },
  },
  computed: {
    dateAlert() {
      let returnString = "";
      if (this.dateDayToggle === "Dates in a Month") {
        if (this.selectedDates.length <= 0) {
          returnString = "Date is required";
        }
      } else {
        if (this.selectedDays.length <= 0) {
          returnString = "Date is required";
        }
      }
      return returnString;
    },
  },
};
</script>
