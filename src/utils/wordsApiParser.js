/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import DictionaryItem from '../data/DictionaryItem';

class WordsApiParser {
  wordsResponseToDictionaryItems(wordsResponse) {
    const items = [];

    for (const wordResponse of wordsResponse) {
      const firstDescription = wordResponse.results[0];
      const definitions = wordResponse.results.map((word) => word.definition);
      const dictionaryItem = new DictionaryItem(
        wordResponse.word,
        firstDescription.partOfSpeech,
        definitions,
        wordResponse.pronunciation?.all ?? '',
      );

      items.push(dictionaryItem);
    }

    return items;
  }
}

const wordsApiParser = new WordsApiParser();

export default wordsApiParser;
