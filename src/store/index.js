import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [
      { name: 'John', gender: 'Male' },
      { name: 'Sarah', gender: 'Female' },
      { name: 'Tisha', gender: 'Female' },
      { name: 'Grisha', gender: 'Male' }
    ],
    filter: {
      gender: ['Male', 'Female']
    }
  },

  getters: {
    filteredItems: (state) => {
      return [...state.items].filter(item => {
        return Object.keys(state.filter).every(filterKey => {
          return state.filter[filterKey].includes(item[filterKey])
        })
      })
    }
  },

  mutations: {
    setItems(state, items) {
      state.items = items
    },

    setFilter(state, filters) {
      state.filter = filters
    }
  },

  actions: {
    addItem({ commit, state }, item) {
      commit('setItems', [...state.items, item])
    },

    removeLastItem({ commit, state, getters }) {
      const itemToRemove = getters.filteredItems[getters.filteredItems.length - 1]

      commit('setItems', [...state.items].filter(item => {
        return !(item.name === itemToRemove.name && item.gender === itemToRemove.gender)//Object.is(item, itemToRemove)
      }))
    }
  }
})
