/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../data/config';
import searchHelper from '../utils/searchHelper';

axios.defaults.baseURL = config.url;
axios.defaults.headers = config.requestHeaders;

class DictionaryService {
  constructor(configData) {
    this.config = configData;
  }

  async getWordDefinition(word) {
    return axios.get(`/words/${word.trim()}`);
  }

  // eslint-disable-next-line no-unused-vars
  async getWordDefinitionsByKeyword(keyword) {
    const response = [];
    const params = {
      letterPattern: searchHelper.getSearchRegexPatter(keyword),
      limit: this.config.fetchCount,
      page: 1,
      hasDetails: 'typeOf,hasCategories',
    };

    const wordsResponse = await axios.get(`/words/?${new URLSearchParams(params).toString()}`);
    const words = wordsResponse.data.results.data;

    if (!words.length) {
      return [];
    }

    await Promise.all(words.map(async (word) => {
      const wordResponse = await this.getWordDefinition(word);
      response.push(wordResponse.data);
    }));

    return response;
  }
}

const dictionaryService = new DictionaryService(config);

export default dictionaryService;
