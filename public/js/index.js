 var socket = io();
   socket.on('connect', function(){
     console.log('connected to server');
     
     socket.emit('createMessage',{
      from: 'maniek',
      text: 'Hey,evething is working fin',
      createdAt: new Date().toGMTString()
     });
   });
   
   socket.on('disconnect',function() {
     console.log('disconnected from server');
   });
   
   socket.on('newMessage',function(message) {
       console.log('newMessage', message);
   });
   
   
   
   
   
   
   
   