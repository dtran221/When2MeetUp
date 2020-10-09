<template>
  <!-- <v-container class="d-flex flex-column justify-center">
    <v-card height=40 outlined tile>
      Time
      <v-card  outlined tile v-for="n in gridIntervals" v-bind:key="n">
        <v-card height=40>
          {{timeSelect[n+offset]}}
        </v-card>
      </v-card>
    </v-card>
    <v-card outlined tile v-for="Date in eventInfo.dates" v-bind:key="Date">
      {{ Date }}
      <v-card outlined tile v-for="n in gridIntervals" v-bind:key="n">
        <v-card height=10 v-for="x in 4" v-bind:key="x">
          <br />
        </v-card>
      </v-card>
    </v-card> -->
    <!-- building row by row -->
  <v-container class="d-flex flex-row justify-center">
    <v-row class="justify-center">
      <v-card outlined tile> Time </v-card>
      <v-card outlined tile v-for="Date in eventInfo.dates" v-bind:key="Date">
        {{ Date }}
      </v-card>
    </v-row>
    <v-row
      class="justify-center"
      outlined
      tile
      v-for="n in gridIntervals"
      v-bind:key="n"
    >
      <v-card>
        {{ timeSelect[n + offset] }}
      </v-card>
      <v-card class="d-flex flex-column" outlined tile v-for="x in eventInfo.dates.length" v-bind:key="x">
        <v-card class="d-flex flex-row" height="10" width="30" v-for="y in 4" v-bind:key="y">
          <br />
        </v-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      gridCardHeight: 10,
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
      ],
    };
  },
  computed: {
    eventInfo() {
      return this.$store.state.eventDetails;
    },
    gridIntervals() {
      let x = "";
      let startDigit = 0;
      let endDigit = 0;
      if (this.eventInfo.startTime.includes("AM")) {
        x = this.eventInfo.startTime.split(" ");
        startDigit = parseInt(x);
      } else {
        x = this.eventInfo.startTime.split(" ");
        startDigit = parseInt(x) + 12;
      }
      if (this.eventInfo.endTime.includes("AM")) {
        x = this.eventInfo.endTime.split(" ");
        endDigit = parseInt(x);
      } else {
        x = this.eventInfo.endTime.split(" ");
        endDigit = parseInt(x) + 12;
      }
      return endDigit - startDigit + 1;
    },
    offset() {
      return this.timeSelect.indexOf(this.eventInfo.startTime) - 1;
    },
  },
};
</script>

<style>
</style>