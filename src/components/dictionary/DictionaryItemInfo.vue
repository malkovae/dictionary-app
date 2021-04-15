<template>
  <div v-if="data">
    <p>
      Word: <strong>{{ data.word }}</strong>
    </p>
    <p v-if="data.partOfSpeech">
      Part of speech: {{ data.partOfSpeech }}
    </p>
    <p v-if="data.transcription">
      Transcription: [ {{ data.transcription }} ]
    </p>
    <div v-if="data.definitions.length">
      <p>Definitions:</p>
      <ul>
        <li v-for="definition of data.definitions" :key="definition">{{ definition }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DictionaryItemInfo',
  props: {
    data: {
      type: Object,
      default: () => null,
    },
  },
};
</script>
