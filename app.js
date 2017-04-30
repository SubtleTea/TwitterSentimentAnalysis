
let twit = require('twit');
let config = require('./config');
let Twitter = new twit(config);
let analysis = require('./analysis');

const https = require('https');
const express = require('express');
let app = express();
app.listen(3000);
let tweets;

function SearchTermData (Searchterm, Count) {
Twitter.get('search/tweets', {
  q: Searchterm,
  count: Count,
  include_rts: false,
  result_type: 'recent',
  lang: 'en'},
  function searchdata(err, data, response) {
    let Passing = []
    for (let i = 0;i < Count; i++) {
      Passing.push(PassTwitterInfo(data.statuses[i]));
    }

    let sentiment = [];
    let tweets = [];
    let dates = [];
    let sum = [];
    let dailyPercentChange = [];
    let minPercentIndex = 0;
    let maxPercentIndex = 0;
    let drasticPercentIndex = 0;
    let minPercentIndex2 = 0;
    let maxPercentIndex2 = 0;
    let max = 0;
    let min = 0;
    let average = 0;

    /*/
    //create tweetInfo object to pass to codeproj2?
    let tweetInfo = {dates[], sum[], dailyPercentChange[], minPercentIndex, maxPercentIndex, minPercentIndex2, maxPercentIndex2, drasticPercentIndex, max, min, average};
    /*/
    for (let i = 0; i < Passing.length; i++){
      tweets.push(Passing[i].text);
      dates.push(Passing[i].date);
      sentiment.push(analysis.basicSentiment(tweets[i], analysis.getAfinn()));
      sum[i] = sentiment[i].sum;
      average += sum[i];
      if (max < sum[i]){
        max = sum[i];
      }
      if (min > sum[i]){
        min = sum[i];
      }
    }
    let minChange = Number.MAX_NUMBER;
    let maxChange = - (Number.MAX_NUMBER);
    for (let i = 0; i < Passing.length; i++){
      let change = ((sum[i+1]-sum[i])/(sum[i]))*100;
      dailyPercentChange.push(change);
      if (change < minChange){
        minChange = change;
        minPercentIndex = i;
      }
      else if (change == minChange){
        minPercentIndex2 = i;
      }
      if (change > maxChange){
        maxChange = change;
        maxPercentIndex = i;
      }
      else if (change == maxChange){
        maxPercentIndex2 = i;
      }
    }
    if(Math.abs(dailyPercentChange[maxPercentIndex]) > Math.abs(dailyPercentChange[minPercentIndex])){
        drasticPercentIndex = maxPercentIndex;
    }
    else if (Math.abs(dailyPercentChange[maxPercentIndex]) < Math.abs(dailyPercentChange[minPercentIndex])){
        drasticPercentIndex = minPercentIndex;
    }
    //usage of maxPercentIndex/minPercentIndex/drasticPercentIndex: use paired with dates[i]
    //(and possibly sum[i]) will tell us the day with a sudden shift in public opinion
    //only pass max/minPercentIndex2 if they have a value greater than 0
    //maybe make an object containing the above
    //maybe return this value to codeproj2.html?
    average = average/Passing.length;
    //console.log(max + ' '+ min);
});
}

//extract month from date
//call function w/ date[i]
//dates = date.split(' ');
//call diff function with (dates[1])
/*/switch (month){
case 'Jan':
      month = parseInt(1);
      break;
case 'Feb':
      month = parseInt(2);
      break;
case 'Mar':
      month = parseInt(3);
      break;
case 'Apr':
      month = parseInt(4);
      break;
case 'May':
      month = parseInt(5);
      break;
case 'Jun':
      month = parseInt(6);
      break;
case 'Jul':
      month = parseInt(7);
      break;
case 'Aug':
      month = parseInt(8);
      break;
case 'Sep':
      month = parseInt(9);
      break;
case 'Nov':
      month = parseInt(10);
      break;
case 'Dec':
      month = parseInt(10);
}
/*/

 function DisplayTwitterinfo(tweet) {
   //console.log(tweet.user.name);
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

SearchTermData('cuny', 50);
