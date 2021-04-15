const favoriteWordsStore = {
  state: {
    favoriteSearchKeyword: '',
    searchPartOfSpeech: '',
    favoriteWords: [],
  },
  mutations: {
    setFavoriteSearchKeyword(state, value) {
      state.favoriteSearchKeyword = value;
    },
    setSearchPartOfSpeech(state, value) {
      state.searchPartOfSpeech = value;
    },
    addFavoriteWord(state, value) {
      if (state.favoriteWords.some((x) => x.word === value.word)) {
        return;
      }

      state.favoriteWords.push(value);
    },
    removeFavoriteWord(state, value) {
      const wordIndex = state.favoriteWords.findIndex((x) => x.word === value.word);

      if (wordIndex !== -1) {
        state.favoriteWords.splice(wordIndex, 1);
      }
    },
    setFavoriteWords(state, value) {
      state.favoriteWords = value;
    },
  },
  actions: {
    toogleFavoriteWord({ commit }, { checked, value }) {
      // eslint-disable-next-line no-unused-expressions
      if (checked) {
        commit('addFavoriteWord', value);
        return;
      }

      commit('removeFavoriteWord', value);
      commit('unmarkFavoritesWord', value, { root: true });
    },
  },
  getters: {
    getFavoriteSearchKeyword(state) {
      return state.favoriteSearchKeyword;
    },
    getSearchPartOfSpeech(state) {
      return state.searchPartOfSpeech;
    },
    getFavoriteWords(state) {
      return state.favoriteWords;
    },
  },
};

export default favoriteWordsStore;
