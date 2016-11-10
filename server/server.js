const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
    console.log('new user connected');
    
    socket.emit('newMessage',{
        from: 'Aurelia',
        text: 'Hello thats great',
        createdAt: new Date().toGMTString()
    });
    socket.on('createMessage',(message)=> {
        console.log('createMessage', message);
    });
    socket.on('disconnect',()=> {
        console.log('user was disconnect');
    });
});


const port = process.env.PORT || 3000;
server.listen(port,()=> {
    console.log(`Server is up on port ${port}`);
});
