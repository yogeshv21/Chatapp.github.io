const socket = io();

const form = document.querySelector('#form')
const msginp = document.querySelector('#inp')
const msgcontparent = document.querySelector('#cont')

const append = (msg, position )=>{
  const msgcont = document.createElement('div');
  msgcont.innerText = msg;
  msgcont.classList.add('msg');
  msgcont.classList.add(position);
  msgcontparent.append(msgcont);
}

const naam = prompt('Enter Your Name To Join.')
socket.emit('new-user-connected', naam);

socket.on('user-connected', (naam)=>{
  append(`${naam} Joined the chat`, 'lft')
})

socket.on('received', (data)=>{
  append(`${data.name}: ${data.message}`, 'lft')
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const msg = msginp.value;
    append(`You: ${msg}`, 'rgt');
    socket.emit('send', msg);
    msginp.value = '';
})