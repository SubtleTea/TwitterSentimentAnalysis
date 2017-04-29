const http = require('http');
const twit = require('twit');
const fs = require('fs');


// this is out twitter authenication
let T = new twit({
  consumer_key: 'EFCn2Uh2VflIdI8VOpojivoTk',
  consumer_secret: 'SUpnXWc4K9ZqkUA3SA8vtw8A1qVHi2GyNZkAfY73TpSx66Kypl',
  access_token: '858111776373841924-RuWJHlDDogG5ByovtUheXtdNbbrWCcg',
  access_token_secret: 'a8u7Zv042wg0apmElTtt9SfTwgBV9GJC0LEHxCJPAnYuW',
});


// this piece of code gets a tweet that contains banana  and count of them in this cas s1
T.get('search/tweets', { q: 'banana since:2011-07-11', count: 1 }, function(err, data, response) {
  let x = JSON.stringify(data);
  fs.writeFile('tweets.txt',x);
})


const port = 3000;
const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
