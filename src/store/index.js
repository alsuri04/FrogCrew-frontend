import { createStore } from 'vuex';

const store = createStore ({
  state: {
      isAuthenticated: false,
      isAdmin: false
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setIsAdmin(state, status) {
      state.isAdmin = status;
    },
  }
}) 

export default store