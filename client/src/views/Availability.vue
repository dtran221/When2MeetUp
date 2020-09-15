<template>
  <v-container class="Availability">
      <p>{{eventInfo.eventName}}</p>
  </v-container>
</template>

<script>

import service from "../services/EventService.js";

export default {
    computed: {
    eventInfo() {
      return this.$store.state.eventDetails;
    },
  },
  created() {
    if(this.eventInfo.eventName === '') {
      service.getEvent(this.$route.params.eventId)
      .then((returnedEvent) =>{
          this.$store.dispatch('storeEventDetails', returnedEvent.data);
        })
      .catch((error) => {
          alert("Error: " + error.response.data);
        })
    }
  },

}
</script>

<style>

</style>