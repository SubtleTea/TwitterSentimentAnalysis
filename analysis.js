let fs = require('fs');
//let json = require('FILENAME');
module.exports = {


getAfinn: function(){

  let buffer = [];
  let words;

  words = fs.readFileSync('AFINN-111.txt', 'utf8');
  buffer = words.split(/[\t\n]+/);


  function wordval(fillword, fillvalue){
    this.word = fillword;
    this.value = parseInt(fillvalue);
  }

  let afinn = [];

  for (let i=0; i < buffer.length; i+=2){
    afinn[i/2]=new wordval(buffer[i], buffer[i+1]);
  }
  return afinn;
},

basicSentiment : (tweet, afinn) => {
  let sum = 0;
  let input = [];

  function afinnStats(){
    this.max = 0;
    this.min = 0;
    this.sum = 0;
  }

  let afinnValues = new afinnStats();

  input = tweet.split(' ');
  input.map((x)=> {
    x.toLowerCase();
  });

  for(let i=0; i < input.length; i++){
    input[i] = input[i].replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
    input[i].replace(/[^\w\s!?]/g,'');
    input[i].replace (/[.,?!\s,]/g, " ");
    //input[i].replace(';','');
  }
  //console.log(input);


  for (let i=0; i < input.length; i++){
    for (let j=0; j < afinn.length; j++){

      if(input[i] == afinn[j].word){
          afinnValues.sum += afinn[j].value;
      }
      else{
          afinnValues.sum += 0;
      }
    }
  }
  return afinnValues;
}
}
