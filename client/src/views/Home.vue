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
    <v-select
          :items="timeSelect"
          label="Start Time: "
          v-model="startTime"
          outlined
        ></v-select>
    <v-select
          :items="timeSelect"
          label="End Time: "
          v-model="endTime"
          outlined
        ></v-select>
    <v-textarea
          outlined
          name="input-7-4"
          label="Comment for Attendees"
          v-model="commentFromCreator"
        ></v-textarea>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data () {
    return {
      eventName: '',
      startTime:'9 AM',
      endTime:'9 PM',
      timeZone:'',
      commentFromCreator: '',
      dateDayToggle: 'Dates in a Month',
      timeSelect: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM']
    }
  }
}
</script>
