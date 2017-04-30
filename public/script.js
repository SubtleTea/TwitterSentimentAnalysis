
let socket;
socket = io.connect('http://localhost:3000');

let mybutton = document.getElementById('BUTTONS');
let h1 = document.getElementById('trying');
let input = document.getElementById('inputTweet');

mybutton.addEventListener('click', () => {
  socket.emit('click', input.value);

  socket.on('click',()=>{
    let body = document.getElementsByTagName('body');
    body.style.backgroundColor = '#000000';
  });
});
