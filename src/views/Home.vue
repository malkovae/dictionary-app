<template>
  <div class="content-wrapper">
    <div class="content-wrapper__search-panel">
      <SearchInput
        v-model="searchKeyword"
        placeholder="Press enter for search"
        @pressEnter="searchWords"
      />
    </div>
    <div class="content-wrapper__display-panel">
      <div v-if="$store.getters.isLoadingStatus" class="content-wrapper__display-panel-info">
        <b-spinner label="Loading..."/>
      </div>
      <div v-else>
        <div v-if="$store.getters.getWords">
          <DictionaryItems v-if="$store.getters.getWords.length"
            :items="$store.getters.getWords"
          />
          <span v-else class="content-wrapper__display-panel-info">
            Sorry. The word was not found in the dictionary. Please, make sure the input is correct.
          </span>
        </div>
        <span v-else class="content-wrapper__display-panel-info">
          <strong>Dear friend,</strong> this is a simple app for finding definitions
           of English words. Start your search now and add words to your bookmarks
           (<mark>mark</mark> words with stars)
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import DictionaryItems from '../components/dictionary/DictionaryItems.vue';
import SearchInput from '../components/base/SearchInput.vue';

export default {
  name: 'Home',
  components: {
    DictionaryItems,
    SearchInput,
  },
  data() {
    return {
      searchKeyword: this.$store.getters.getSearchKeyword,
    };
  },
  methods: {
    async searchWords() {
      this.$store.commit('setSearchKeyword', this.searchKeyword);
      this.$store.dispatch('fetchWordsDefinitions');

      if (this.$store.getters.getFetchErrorStatus) {
        this.$bvToast.toast('Sorry, there was an error trying to get the data. Please try later', {
          title: 'Error',
          variant: 'danger',
        });
      }
    },
  },
  watch: {
    searchKeyword(value) {
      if (!value) {
        this.$store.commit('resetWordsData');
      }
    },
  },
};
</script>

<style lang='scss'>
  @import './../assets/styles/blocks/_contentWrapper.scss';
</style>
