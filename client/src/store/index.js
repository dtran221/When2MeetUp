import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventDetails: {
      eventId: 0,
      eventName: "",
      startTime: "9 AM",
      endTime: "9 PM",
      selectedTimeZone: "",
      commentFromCreator: "",
      dateDayToggle: "Dates in a Month",
      selectedDates: [],
      selectedDays: [],
    },
    availabilityData: [],
  },
  mutations: {
    storeEventDetails (state,payload) {
      state.eventDetails = payload;
    }
  },
  actions: {
    storeEventDetails ({ commit }, payload) {
      commit ("storeEventDetails", payload);
    }
  },
  modules: {
  }
})
