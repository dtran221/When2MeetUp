<template>
  <v-container> 
      <v-card v-for= "Date in eventInfo.dates" v-bind:key="Date">
          {{Date}}
      </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    eventInfo() {
      return this.$store.state.eventDetails;
    },
  },
};
</script>

<style>
</style>