<template>
  <div v-if="data" class="dictionary-item">
    <span v-if="isDraggable"
      class="hamburger" :class="[isDragDisable ? 'hamburger_disable' : dragTriggerClassName]">
      <svg viewBox="0 0 100 80" width="20" height="15">
        <rect width="100" height="10" rx="8"></rect>
        <rect y="30" width="100" height="10" rx="8"></rect>
        <rect y="60" width="100" height="10" rx="8"></rect>
      </svg>
    </span>
    <span class="dictionary-item__descr" @click="clicked">
      <b class="dictionary-item__word">{{ data.word }}</b>
      <i class="dictionary-item__partOfSpeech">{{ data.partOfSpeech }}</i>
      <span >{{ data.baseDefinition }}</span>
    </span>
    <div @click="toogleFavorite" class="star-sign">
      <span v-if="data.isFavorites">&#9733;</span>
      <span v-else>&#9734;</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DictionaryItem',
  props: {
    data: {
      type: Object,
      default: () => null,
    },
    isDraggable: {
      type: Boolean,
      default: false,
    },
    isDragDisable: {
      type: Boolean,
      default: false,
    },
    dragTriggerClassName: {
      type: String,
    },
  },
  methods: {
    toogleFavorite() {
      this.data.isFavorites = !this.data.isFavorites;
      const toogleOptions = { checked: this.data.isFavorites, value: this.data };
      this.$store.dispatch('toogleFavoriteWord', toogleOptions);
    },
    clicked() {
      this.$emit('clicked', this.data);
    },
  },
};
</script>

<style lang='scss'>
  .dictionary-item {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    margin-bottom: 8px;
    font-size: 20px;
    background-color: white;
    border-radius: 4px;
    &__word {
      margin-right: 20px;
      white-space: nowrap;
    }
    &__partOfSpeech {
      margin-right: 10px;
    }
    &__descr {
      margin-right: 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
    }
    .hamburger {
      margin-right: 20px;
      cursor: move;
      &_disable {
        cursor: default;
        fill: gray;
      }
    }
    .star-sign {
      font-size: 25px;
      margin-left: 50px;
      color: rgb(134, 190, 252);
      margin-left: auto;
      cursor: pointer;
      &__checked {
        fill: rgb(134, 190, 252);;
      }
    }
  }
</style>
