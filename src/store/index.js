import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [
      { name: "John", gender: "Male" },
      { name: "Sarah", gender: "Female" },
      { name: "Tisha", gender: "Female" },
      { name: "Grisha", gender: "Male" }
    ],
    sortDir: 'asc'
  },

  getters: {
    filteredItems: (state) => {
      if (state.sortDir === 'asc') {
        return [...state.items].sort(function (a, b) {
          if (a.gender < b.gender) { return -1; }
          if (a.gender > b.gender) { return 1; }
          return 0;
        })
      } else {
        return [...state.items].sort(function (a, b) {
          if (a.gender < b.gender) { return -1; }
          if (a.gender > b.gender) { return 1; }
          return 0;
        }).reverse()
      }
    }
  },

  mutations: {
    setItems(state, items) {
      state.items = items
    },

    setSortDir(state, dir) {
      state.sortDir = dir
    }
  },

  actions: {
    addItem({ commit, state }, item) {
      commit('setItems', [...state.items, item])
    },

    removeLastItem({ commit, state }) {
      commit('setItems', state.items.slice(0, -1))
    }
  }
})
