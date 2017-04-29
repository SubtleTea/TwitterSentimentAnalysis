const fs = require('fs');
module.exports = {
  //Gets the tweet from Twitter
  //@Params: search = What tweet you want returned
  //@Params: Twitter is the twit object
  //@Params: nCount is the number of tweets of your searched terms you want
  //@return: returns the json of the tweet
  //@return: at the momment no retweets but we can change that
  SearchTerms: (search, Twitter, nCount) => {
    let params = {
      q: search,
      count: nCount,
      include_rts: false,
      result_type: 'recent',
      lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data, response) {
      let ourJson = {};
      ourJson = toTweetJson(data);
      fs.writeFile('tweets.json',JSON.stringify(ourJson))
      // let x = JSON.stringify(data)
      // return x;
    })
  },
  //@function: Simiplifys the json//

};
function toTweetJson(tweet){
 let data = {};
 data.Tweet = tweet.statuses[0].text;
 data.Date = tweet.statuses[0].created_at;
 data.setiment = 0;
 return data
}
