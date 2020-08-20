<template>
  <div class="home">
    <v-text-field
            v-model="eventName"
            label="Event Name"
            placeholder="Study Night"
            outlined
            clearable
            required
          ></v-text-field>
    <h1>Potential dates for the event</h1>
    <v-btn-toggle
          v-model="dateDayToggle"
          mandatory
        >
          <v-btn value = "Dates in a Month">
            Dates in a Month
          </v-btn>
          <v-btn value = "Days of the Week">
            Days of the Week
          </v-btn>
        </v-btn-toggle>
    <div v-if="dateDayToggle === 'Dates in a Month'"> placeholder for dates in month</div>
    <div v-else> placeholder for days of the week</div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data () {
    return {
      eventName: '',
      startTime:0,
      endTime:0,
      timeZone:'',
      commentFromCreator: '',
      dateDayToggle: 'Dates in a Month',
    }
  }
}
</script>
