const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyparser);
app.use(cors);

const server = app.listen(5000);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('client-get_data', () => {
    console.log('sending data to client')
    const data = fs.readFileSync(__dirname + '/data.txt', 'utf-8');
    socket.emit('host-send_data', data);
  })

  setInterval(() => {
    console.log('sending data to client')
    const data = fs.readFileSync(__dirname + '/data.txt', 'utf-8');
    socket.emit('host-send_data', data);
  }, 5000)
})


console.log('server listening');