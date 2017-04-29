module.exports = {
  SearchTerms: (search, Twitter) => {
    let params = {
      q: search,
      result_type: 'recent',
      lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data, response) {
      console.log(data);
      return x;
    })
  },
  toTweetJson: (tweet) => {
    let data = {};
    data.Tweet = tweet.statuses[0].text;
    return data
  },
};
