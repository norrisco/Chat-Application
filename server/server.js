// const express = require('express');

// const http = require('http').Server(app);
// const socketIo = require('socket.io');
// const path = require('path');

// const router = require('./routes/index');
// const port = process.env.PORT || 4001;

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(router);
const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const port = 3001;
app.use(express.static(path.join(__dirname, '..', 'public')));

// app.listen(port, () => console.log(`Listening on port: ${port}`));
http.listen(port, () => {
	console.log(`listening on port: ${port}`);
});

const users = [];
const rooms = [];

const getRooms = () => {
	// let clients = io.sockets.clients().connected;
	// //will grab all values of client and return an array
	// let sockets = Object.values(clients);
	return rooms;
};
const emitRooms = () => {
	io.emit('rooms', getRooms());
};

io.on('connection', (socket) => {
	console.log('User connected: ', socket.id);

	socket.on('create_room', (room) => {
		rooms.push(room);
		emitRooms();
	});

	//when someone creates a room
	//room gets created and displyed in the lobby
	//user gets automatically join to roomchat with roomname
	//user has to assign its user name

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});
