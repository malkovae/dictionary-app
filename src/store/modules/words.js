/* eslint-disable max-len */
import dictionaryService from '../../api/dictionaryService';
import wordsApiParser from '../../utils/wordsApiParser';

function sortFetchedWords(words) {
  words.sort((a, b) => ((a.word > b.word) ? 1 : -1));
}

// eslint-disable-next-line no-unused-vars
function markFavoritesFetchedWords(rootState, fetchedWords) {
  const { favoriteWords } = rootState.favoriteWords;

  if (!favoriteWords?.length) {
    return;
  }

  const favoriteWordsOnly = favoriteWords.map((x) => x.word);

  fetchedWords.forEach((x) => {
    if (favoriteWordsOnly.includes(x.word)) {
      // eslint-disable-next-line no-param-reassign
      x.isFavorites = true;
    }
  });
}

const wordsStore = {
  state: {
    searchKeyword: '',
    searchedWords: null,
    isDataLoading: false,
    fetchErrorStatus: false,
  },
  mutations: {
    setSearchKeyword(state, value) {
      state.searchKeyword = value;
    },
    setWords(state, value) {
      state.searchedWords = value;
    },
    setLoadingStatus(state, value) {
      state.isDataLoading = value;
    },
    setFetchErrorStatus(state, value) {
      state.fetchErrorStatus = value;
    },
    resetWordsData(state) {
      state.searchKeyword = '';
      state.searchedWords = null;
    },
    unmarkFavoritesWord(state, value) {
      const existedWord = state.searchedWords.find((x) => x.word === value.word);

      if (existedWord) {
        existedWord.isFavorites = false;
      }
    },
  },
  actions: {
    async fetchWordsDefinitions({ rootState, commit, state }) {
      try {
        commit('setLoadingStatus', true);
        const wordsResponse = await dictionaryService.getWordDefinitionsByKeyword(state.searchKeyword);
        if (!wordsResponse.length) {
          commit('setWords', []);
          return;
        }

        const words = wordsApiParser.wordsResponseToDictionaryItems(wordsResponse);
        sortFetchedWords(words);
        markFavoritesFetchedWords(rootState, words);
        commit('setWords', words);
        commit('setFetchErrorStatus', false);
      } catch (error) {
        commit('setFetchErrorStatus', true);
        console.error(error);
      } finally {
        commit('setLoadingStatus', false);
      }
    },
  },
  getters: {
    getSearchKeyword(state) {
      return state.searchKeyword;
    },
    getWords(state) {
      return state.searchedWords;
    },
    isLoadingStatus(state) {
      return state.isDataLoading;
    },
    getFetchErrorStatus(state) {
      return state.fetchErrorStatus;
    },
  },
};

export default wordsStore;
