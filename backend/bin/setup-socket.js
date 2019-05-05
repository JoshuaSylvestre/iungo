const http = require('http');
// const https = require('https');
const sio = require('socket.io');

const setupSocket = (server) => {
  const options = {
    // key: fs.readFileSync(__dirname + '/rtc-video-room-key.pem'),
    // cert: fs.readFileSync(__dirname + '/rtc-video-room-cert.pem')
  };

  // these two line no longer needed, server should be passed in by /bin/www
  // const port = process.env.PORT || 5000;
  // const server = http.createServer(app).listen(port);
  const io = sio(server);

  io.sockets.on('connection', (socket) => {
    let room = '';
    const create = (err) => {
      if (err) {
        return console.log(err);
      }
      socket.join(room);
      socket.emit('create');
    };

    // sending to all clients in the room (channel) except sender
    socket.on('message', message => socket.broadcast.to(room).emit('message', message));

    socket.on('find', () => {
      const url = socket.request.headers.referer.split('/');
      room = url[url.length - 1];
      const sr = io.sockets.adapter.rooms[room];
      if (sr === undefined) {
        // no room with such name is found so create it
        socket.join(room);
        socket.emit('create');
      } else if (sr.length === 1) {
        socket.emit('join');
      } else { // max two clients
        socket.emit('full', room);
      }
    });

    socket.on('auth', (data) => {
      data.sid = socket.id;
      // sending to all clients in the room (channel) except sender
      socket.broadcast.to(room).emit('approve', data);
    });

    socket.on('accept', (id) => {
      io.sockets.connected[id].join(room);
      // sending to all clients in 'game' room(channel), include sender
      io.in(room).emit('bridge');
    });

    socket.on('reject', () => socket.emit('full'));
    socket.on('leave', () => {
      // sending to all clients in the room (channel) except sender
      socket.broadcast.to(room).emit('hangup');
      socket.leave(room);
    });
  });
};

module.exports = setupSocket;
