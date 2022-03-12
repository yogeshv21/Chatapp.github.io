const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server)

const users = {}

io.on('connection', (socket)=>{
    console.log('new user connected...');
    socket.on('new-user-connected', (name)=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    })

    socket.on('send', (msg)=>{
        socket.broadcast.emit('received', {message: msg, name: users[socket.id]});
    })
})

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000 || process.env.PORT;

server.listen(port, ()=>{
    console.log(`Server running on ${port}`);
})