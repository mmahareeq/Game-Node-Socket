const express = require("express");
const path = require('path');
const http= require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));



const port = process.env.PORT || 8080;
io.on('connection', () => { // listen for new connections to Socket.IO
    console.log('A new player just connected');
    });
server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});