<template>
  <div>
    <div v-if="localItems">
      <draggable v-if="isDraggable"
        v-model="localItems"
        handle=".draggable"
      >
        <DictionaryItem
          v-for="item in localItems"
          :key="item.word"
          :data="item"
          :isDraggable="isDraggable"
          :dragTriggerClassName="dragTriggerClassName"
          :isDragDisable="isDragDisable"
          @clicked="itemClicked"
        />
      </draggable>
      <DictionaryItem v-else
        v-for="item in localItems"
        :key="item.word"
        :data="item"
        :isDraggable="isDraggable"
        :dragTriggerClassName="dragTriggerClassName"
        :isDragDisable="isDragDisable"
        @clicked="itemClicked"
      />
    </div>

    <b-modal
      :id="wordInfoDialogId"
      ok-only scrollable
      title="Full information"
    >
      <DictionaryItemInfo :data="clickedItem"/>
    </b-modal>
  </div>
</template>

<script>

import draggable from 'vuedraggable';
import DictionaryItem from './DictionaryItem.vue';
import DictionaryItemInfo from './DictionaryItemInfo.vue';

export default {
  name: 'DictionaryItems',
  components: {
    DictionaryItem,
    DictionaryItemInfo,
    draggable,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
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
      default: 'draggable',
    },
  },
  data() {
    return {
      tempItems: this.items,
      clickedItem: [],
      wordInfoDialogId: 'myModal',
    };
  },
  computed: {
    localItems: {
      get() {
        return this.tempItems;
      },
      set(value) {
        this.tempItems = value;
        this.$emit('changed', value);
      },
    },
  },
  methods: {
    itemClicked(item) {
      this.clickedItem = item;
      this.$bvModal.show(this.wordInfoDialogId);
    },
  },
  watch: {
    items(value) {
      this.localItems = value;
    },
  },
};
</script>
