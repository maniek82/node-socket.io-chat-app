const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const {generateMessage, generateLocationMessage} = require("./utils/message");
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
var count =0;
io.on('connection', (socket)=> {
    count++;
    console.log(`New user connected! Total users -${count}-`);
  
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
   
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
    
    socket.on('createMessage',(message, callback)=> {
        console.log('createMessage', message);
        
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback('This is from the server');
    });
    
    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    
    socket.on('disconnect',()=> {
        count--;
        console.log(`User was disconnected! Total users left -${count}-`);
    });
});


const port = process.env.PORT || 3000;
server.listen(port,()=> {
    console.log(`Server is up on port ${port}`);
});
