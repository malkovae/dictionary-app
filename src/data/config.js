export default {
  url: 'https://wordsapiv1.p.rapidapi.com',
  requestHeaders: {
    'x-rapidapi-key': process.env.VUE_APP_RAPIDAPI_KEY,
    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    useQueryString: true,
  },
  fetchCount: 10,
};
