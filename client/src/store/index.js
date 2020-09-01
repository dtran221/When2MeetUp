import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventInfo = {
      eventName: "",
      startTime: "",
      endTime: "",
      timeZone: "",
      commentFromCreator: "",
      dateDayToggle: "",
      selectedDates: [],
      selectedDays: [],
    },
    availabilityData: [],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
