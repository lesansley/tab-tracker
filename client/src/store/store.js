import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    async setToken (state, token) {
      state.token = token;
      state.isUserLoggedIn = token ? true : false;
    },
    async setUser (state, user) {
      state.user = user;
    }
  },
  getters: {
    async getToken(state) {
      return state.token;
    }
  },
  actions: {
    async setToken({ commit }, token) {
      commit('setToken', token);
    },
    async setUser({ commit }, user) {
      commit('setUser', user);
    }
  }
});
