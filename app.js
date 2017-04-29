
var twit = require('twit');
var config = require('./config');
var Twitter = new twit(config);

const https = require('https');
const express = require('express');
let app = express();
app.listen(3000);
var tweets;
function SearchTermData (Searchterm, Count) {
Twitter.get('search/tweets', {
  q: Searchterm,
  count: Count,
  include_rts: false,
  result_type: 'recent',
  lang: 'en'},
  function searchdata(err, data, response) {
    // let y = data.statuses.forEach((x)=>{
    //    return PassTwitterInfo(x);
    // });
    var Passing = []
    for (var i = 0;i < Count; i++) {
//      DisplayTwitterinfo(data.statuses[i]);
      Passing.push(PassTwitterInfo(data.statuses[i]));
      //console.log(Passing)
    }
    console.log(Passing[0]);
    // console.log(data.statuses[2].text);
    // console.log(data.statuses.length)
});
}

 function DisplayTwitterinfo(tweet) {
//   console.log(tweet.user.name);
   console.log(tweet.user.screen_name);
   console.log(tweet.user.id_str);
   console.log(tweet.text);
   console.log(tweet.retweet_count);
   console.log(tweet.favorite_count);
   console.log(tweet.entities.hashtags);
   console.log(tweet.entities.user_mentions);
   console.log(tweet.entities.urls);
 }

 function PassTwitterInfo(tweet){
   var PassVariable = new Object();
   //PassVariable.name = tweet.user.name;
   //PassVariable.username = tweet.user.screen_name;
   PassVariable.id = tweet.user.id_str;
   PassVariable.text = tweet.text;
   PassVariable.date = tweet.created_at;
   PassVariable.retweet = tweet.retweet_count;
   PassVariable.favorite = tweet.favorite_count;
   PassVariable.hashtags = tweet.entities.hashtags;
   PassVariable.mentions = tweet.entities.user_mentions;
   PassVariable.url = tweet.entities.urls;
   //console.log(PassVariable);
   return PassVariable;
 }
//
SearchTermData("apple", 5);
