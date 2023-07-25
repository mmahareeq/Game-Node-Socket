const express = require("express");
const path = require('path');
const http= require('http');
const socketio = require('socket.io');
const formatMessage = require('./controller/formatMessage.js');
const {
  addPlayer,
  getAllPlayers,
  getPlayer,
  removePlayer,
} = require("./controller/players.js");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));



const port = process.env.PORT || 3000;
io.on('connection', () => { // listen for new connections to Socket.IO
   console.log('A new player just connected');
    socket.on('join', ({ playerName, room }, next) => {
        console.log('hi client')
        const { error, newPlayer } = addPlayer({ id: socket.id, playerName, room });
    
        if (error) return next(error.message);
        next(); // The callback can be called without data.
    
        socket.join(newPlayer.room);
    
        socket.emit('message', formatMessage('Admin', 'Welcome!'));
        socket.broadcast
        .to(newPlayer.room)
        .emit(
          'message',
          formatMessage('Admin', `${newPlayer.playerName} has joined the game!`)
        );
        io.in(newPlayer.room).emit('room', {
          room: newPlayer.room,
          players: getAllPlayers(newPlayer.room),
        });
      
    });






socket.on('sendMessage', (message, callback) => {
    const { error, player } = getPlayer(socket.id);

    if (error) return callback(error.message);

    if (player) {
      io.to(player.room).emit(
        'message',
        formatMessage(player.playerName, message)
      );
      callback();
    }
  });

  socket.on('disconnect', () => {
    console.log('A player disconnected.');

    const disconnectedPlayer = removePlayer(socket.id);

    if (disconnectedPlayer) {
      const { playerName, room } = disconnectedPlayer;
      io.in(room).emit(
        'message',
        formatMessage('Admin', `${playerName} has left!`)
      );

      io.in(room).emit('room', {
        room,
        players: getAllPlayers(room),
      });
    }
  });
});
server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
}); 