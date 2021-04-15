<template>
  <div class="content-wrapper">
    <div class="content-wrapper__header">
      <h2>Starred words list</h2>
    </div>
    <div class="content-wrapper__search-panel">
      <SearchInput
        v-model="searchKeyword"
        placeholder="Input anything"
      />
      <div>
        <span>Filter by part of speech:</span>
        <b-form-checkbox
          id="adjective"
          value="adjective"
          v-model="searchPartOfSpeech"
        >
          adjective
        </b-form-checkbox>
        <b-form-checkbox
          id="verb"
          value="verb"
          v-model="searchPartOfSpeech"
        >
          verb
        </b-form-checkbox>
        <b-form-checkbox
          id="noun"
          value="noun"
          v-model="searchPartOfSpeech"
        >
          noun
        </b-form-checkbox>
      </div>
    </div>
    <div class="content-wrapper__display-panel">
      <div v-if="filteredFavoritesWords">
        <DictionaryItems v-if="filteredFavoritesWords.length"
          :items="filteredFavoritesWords"
          :isDraggable="true"
          :isDragDisable="true"
        />
        <span v-else class="content-wrapper__display-panel-info">Not found</span>
      </div>
      <div v-else>
        <DictionaryItems v-if="favoritesWords.length"
          :items="favoritesWords"
          :isDraggable="true"
          @changed="favoritesWordsChanged"
        />
        <span v-else class="content-wrapper__display-panel-info">Empty...</span>
      </div>
    </div>
  </div>
</template>

<script>

import DictionaryItems from '../components/dictionary/DictionaryItems.vue';
import SearchInput from '../components/base/SearchInput.vue';
import searchHelper from '../utils/searchHelper';

export default {
  name: 'FavoritesWords',
  components: {
    DictionaryItems,
    SearchInput,
  },
  computed: {
    favoritesWords: {
      get() {
        return this.$store.getters.getFavoriteWords;
      },
      set(value) {
        this.$store.commit('setFavoriteWords', value);
      },
    },
    searchKeyword: {
      get() {
        return this.$store.getters.getFavoriteSearchKeyword;
      },
      set(value) {
        this.$store.commit('setFavoriteSearchKeyword', value);
      },
    },
    searchPartOfSpeech: {
      get() {
        return this.$store.getters.getSearchPartOfSpeech;
      },
      set(value) {
        this.$store.commit('setSearchPartOfSpeech', value);
      },
    },
    filteredFavoritesWords: {
      get() {
        if (!this.searchKeyword && !this.searchPartOfSpeech?.length) {
          return null;
        }

        let filteredWords = this.favoritesWords;

        if (this.searchPartOfSpeech.length) {
          const filteredByPartOfSpeech = this.favoritesWords.filter((x) => {
            // eslint-disable-next-line no-unneeded-ternary
            const result = (this.searchPartOfSpeech.includes(x.partOfSpeech)) ? true : false;
            return result;
          });

          filteredWords = filteredByPartOfSpeech;
        }

        if (this.searchKeyword) {
          const filteredByKeyword = filteredWords.filter((x) => {
            const searchRegex = new RegExp(searchHelper.getSearchRegexPatter(this.searchKeyword));
            // eslint-disable-next-line no-unneeded-ternary
            const result = searchRegex.test(x.word) ? true : false;
            return result;
          });

          filteredWords = filteredByKeyword;
        }

        return filteredWords;
      },
    },
  },
  methods: {
    filterOptionChecked(e) {
      this.searchPartOfSpeech = [];
      if (e.target.checked) {
        this.searchPartOfSpeech.push(e.target.value);
      }
    },
    favoritesWordsChanged(value) {
      this.favoritesWords = value;
    },
  },
};
</script>

<style lang='scss'>
  @import './../assets/styles/blocks/_contentWrapper.scss';
</style>
