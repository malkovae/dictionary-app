/* eslint-disable prefer-destructuring */
export default class DictionaryItem {
  constructor(word, partOfSpeech, definitions, transcription) {
    this.word = word;
    this.partOfSpeech = partOfSpeech;
    this.definitions = definitions;
    this.transcription = transcription;
    this.baseDefinition = definitions[0];
    this.isFavorites = false;
  }
}
