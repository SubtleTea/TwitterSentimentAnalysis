
var twit = require('twit');
var config = require('./config');
var Twitter = new twit(config);
let analysis = require('./analysis');

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

    let sentiment = [];
    let tweets = [];
    let sum = [];
    let max = 0;
    let min = 0;
    for (let i = 0; i < Passing.length; i++){
      tweets.push(Passing[i].text);
      sentiment.push(analysis.basicSentiment(tweets[i], analysis.getAfinn()));
      //console.log(sentiment[i].sum);
      sum[i] = sentiment[i].sum;
      //console.log(sentiment[i].max);
      if (max < sum[i]){
        max = sum[i];
      }
      if (min > sum[i]){
        min = sum[i];
      }
    }
    console.log(max + ' '+ min);

    //let sentiment = analysis.basicSentiment(tweets[i], analysis.getAfinn());
    //console.log(sentiment.sum);


    // console.log(data.statuses[2].text);
    // console.log(data.statuses.length)
});
}

 function DisplayTwitterinfo(tweet) {
//   console.log(tweet.user.name);
   //console.log(tweet.user.screen_name);
   //console.log(tweet.user.id_str);
   console.log(tweet.text);
   console.log(tweet.retweet_count);
   console.log(tweet.favorite_count);
   console.log(tweet.entities.hashtags);
   //console.log(tweet.entities.user_mentions);
   console.log(tweet.entities.urls);
 }

 function PassTwitterInfo(tweet){
   var PassVariable = new Object();
   try {PassVariable.name = tweet.user.name;}
   catch(err) {PassVariable.name = " ";}
  //  console.log(PassVariable.name);
   try {PassVariable.username = tweet.user.screen_name}
   catch(err) {PassVariable.username = " "}
  //  console.log(PassVariable.username);
   try {PassVariable.id = tweet.user.id_str;}
   catch(err) {PassVariable.id = " "}
  //  console.log(PassVariable.id);
   try {PassVariable.text = tweet.text;}
   catch(err) {PassVariable.text = " ";}
  //  console.log(PassVariable.text);
   try {PassVariable.date = tweet.created_at;}
   catch(err) {PassVariable.date = " ";}
  //  console.log(PassVariable.date);
   try {PassVariable.retweet = tweet.retweet_count;}
   catch(err) {PassVariable.retweet = 0;}
   //console.log(PassVariable.retweet);
   try {PassVariable.favorite = tweet.favorite_count;}
   catch(err) {PassVariable.favorite = 0;}
   //console.log(PassVariable.favorite);
   try {PassVariable.hashtags = tweet.entities.hashtags;}
   catch(err) {PassVariable.hashtags = " ";}
   //console.log(PassVariable.hashtags);
   try {PassVariable.mentions = tweet.entities.user_mentions;}
   catch(err) {PassVariable.mentions = " ";}
  //  console.log(PassVariable.mentions);
  //  console.log(PassVariable);
   return PassVariable;
 }
//
SearchTermData('happy', 50);
