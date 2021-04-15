import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import words from './modules/words';
import favoriteWords from './modules/favoriteWords';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    words,
    favoriteWords,
  },
  plugins: [createPersistedState()],
});
