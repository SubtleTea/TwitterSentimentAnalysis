const http = require('http');
const express = require('express');
const FromTwitter = require('./FromTwitter');
const twit = require('twit');
const fs = require('fs');
const config = require('./config');
let app = express();



//let x = fs.readFileSync('tweets.json','utf8');
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
let T = new twit(config);
x = FromTwitter.SearchTerms('apple', T);

// x = toJson.toTweetJson(y);
// console.log(x);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
// this is out twitter authenication








//this piece of code gets a tweet that contains banana  and count of them in this cas s1
T.get('search/tweets', {
  q: 'CUNY since:2011-07-11',
  count: 1
}, function(err, data, response) {
  let x = JSON.stringify(data);
  fs.writeFile('tweets.json', x);
})
