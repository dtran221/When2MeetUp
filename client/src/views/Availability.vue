<template>
  <v-container class="Availability">
    <v-card elevation="2">
      <v-card-title>{{eventInfo.eventName}}</v-card-title>
      <v-card-text>
        <p>{{eventInfo.commentFromCreator}}</p>
      </v-card-text>
      <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Add/Edit Availability
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        View Group Availability
      </v-btn>
    </v-card-actions>
    </v-card>
    <availability-grid>
    </availability-grid>
  </v-container>
</template>

<script>
import service from "../services/EventService.js";
import AvailabilityGrid from "../components/AvailabilityGrid.vue"

export default {
  components: {
    AvailabilityGrid
  },
  computed: {
    eventInfo() {
      return this.$store.state.eventDetails;
    },
  },
  created() {
    if (this.eventInfo.eventName === "") {
      service
        .getEvent(this.$route.params.eventId)
        .then((returnedEvent) => {
          this.$store.dispatch("storeEventDetails", returnedEvent.data);
        })
        .catch((error) => {
          alert("Error: " + error.response.data);
        });
    }
  },
};
</script>

<style>
</style>