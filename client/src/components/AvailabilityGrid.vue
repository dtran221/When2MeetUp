<template>
  <v-container class="d-flex flex-row"> 
      <v-card  v-for= "Date in eventInfo.dates" v-bind:key="Date">
          {{Date}}
        <v-card v-for= "n in gridIntervals" v-bind:key="n">
          {{n}}
        </v-card>
      </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    eventInfo() {
      return this.$store.state.eventDetails;
    },
    gridIntervals() {
      let x = "";
      let startDigit = 0;
      let endDigit = 0;
      if(this.eventInfo.startTime.includes("AM")){
        x = this.eventInfo.startTime.split(" ");
        startDigit = parseInt(x);
      }
      else {
        x = this.eventInfo.startTime.split(" ");
        startDigit = parseInt(x) + 12;
      }
      if(this.eventInfo.endTime.includes("AM")){
        x = this.eventInfo.endTime.split(" ");
        endDigit = parseInt(x);
      }
      else {
        x = this.eventInfo.endTime.split(" ");
        endDigit = parseInt(x) + 12;
      }
      return endDigit - startDigit + 1;
    },
  },
};
</script>

<style>
</style>