import modules from './modules';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules
});

// Automatically run the `init` action for every module,
// if one exists.
// dispatchActionForAllModules('init');
