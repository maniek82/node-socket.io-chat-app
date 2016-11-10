const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
var count =0;
io.on('connection', (socket)=> {
    count++;
    console.log(`New user -${count} connected!`);
    
    socket.on('createMessage',(message)=> {
        console.log('createMessage', message);
        io.emit('newMessage',{
           from: message.from,
           text: message.text,
           createdAt: new Date().toGMTString()
        });
    });
    socket.on('disconnect',()=> {
        console.log('user was disconnect');
    });
});


const port = process.env.PORT || 3000;
server.listen(port,()=> {
    console.log(`Server is up on port ${port}`);
});
