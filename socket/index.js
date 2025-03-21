require('dotenv').config()
const crypto = require('crypto')

const app = require("express")();
const httpServer = require("http").createServer(app);
const options = {
    path: process.env.SOCKET_PATH,
    cors: {
        origin: process.env.CORS_ALLOWED,
        methods: ["GET", "POST"],
        credentials: true,
      }
};
const io = require("socket.io")(httpServer, options);

 async function sendMessage( user, channel, url, message, reply, assets) {
  try
  {
      
      const response = await fetch(process.env.API_URL + '/message.php', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
              user: user,
              channel: channel,
              url: url,
              message: message,
              reply: reply || null,
              assets: assets || null

            })
        });
      const data = await response.json();
      console.log('success');
}
catch(err)
{
  console.log(err);
} 
}

io.on("connection", socket => {
  console.log(socket.id + ' connected')

  socket.on('joinChannel', (channel) => {
    socket.join(channel);
    console.log('Socket ' + socket.id + ' joined channel ' + channel);
    
});

socket.on('typing_start', ({ user, channel}) => {
  io.to(channel).emit('typing_start', user, channel);
  console.log('User ' + user + ' is typing on ' + channel);
  
});

socket.on('typing_stop', ({ user, channel}) => {
  io.to(channel).emit('typing_stop', user, channel);
  console.log('User ' + user + ' stopped typing on ' + channel);
  
});

socket.on('create_channel', ({ user, channel}) => {
  io.to(user).emit('create_channel', channel);

  
});



socket.on('message', ({ user, channel, message, reply, asset }) => {
  // Broadcast message to the club if the user is in the correct channel
  const url = crypto.randomUUID();
  io.to(channel).emit('message', { url, user, channel, message, reply, asset });
  sendMessage( user, channel, url, message, reply, asset);
  console.log('User ' + user + ' with ID ' + socket.id + ' said ' + message + ' on ' + channel + ' ident ' + url + asset);
  
});




socket.on('disconnect', () => {
  console.log('User disconnected: ', socket.id);
});

});

httpServer.listen(4000);
