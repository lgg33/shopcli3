import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    records: []
  },
  getters: {
    // records(state) {
    //   return JSON.parse(localStorage.getItem('info')) == null ? state.recordS : JSON.parse(localStorage.getItem('info'));
    // }
  },
  mutations: {
    initRecords(state) {
      if (JSON.parse(localStorage.getItem('info')) == null) {
        return state.records = [];
      }
      state.records = JSON.parse(localStorage.getItem('info'));
    }
  },
  actions: {
  },
  modules: {
  }
})
