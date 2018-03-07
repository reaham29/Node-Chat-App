const path = require ('path');
const express = require ('express');
const socketio = require ('socket.io');
const http = require ('http');

const pathdir = path.join (__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use (express.static(pathdir));

io.on ('connection', (socket) => {
    console.log ('New user connected');

    socket.on ('createMessage', (Msg, callback) => {
        console.log ('Message Created', Msg);

        io.emit('newMessage', {
            from : Msg.from,
            text : Msg.text,
            createdAt : new Date().getTime()
        });

        callback('Server acknowledge Msg');
    });

    //When new user joins chat, server sends greeting msg to new user
    // and broadcast msg to all other users already there
    socket.emit ('newMessage', {
        from : "Admin",
        text : "Welcome to Chat group",
        createdAt : new Date().getTime()
    });

    socket.broadcast.emit ('newMessage', {
        from : "Admin",
        text : "New User Joined Chat",
        createdAt : new Date().getTime()
    });

    socket.on ('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen (port, () => {
    console.log('Server is up..');
});
