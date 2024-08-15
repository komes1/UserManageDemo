import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedRow: {}
  },
  mutations: {
    setSelectedRow(state, payload) {
      state.selectedRow = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
