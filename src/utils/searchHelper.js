export default {
  getSearchRegexPatter(keyword) {
    return `^(${keyword.trim()}.{0,})`;
  },
};
