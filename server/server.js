const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const port = 3001;
app.use(express.static(path.join(__dirname, '..', 'public')));
`				`;
http.listen(port, () => {
	console.log(`listening on port: ${port}`);
});

const users = [];
const rooms = [];

const getRooms = () => {
	return rooms;
};

const getUsers = () => {
	return users;
};
const emitRooms = () => {
	io.emit('rooms', getRooms());
};
const emitUsers = () => {
	io.emit('users', getUsers());
};
const returnUsername = () => {
	io.emit('username', socket.username);
};

io.on('connection', (socket) => {
	console.log('User connected: ', socket.id);
	console.log(' %s sockets connected', io.engine.clientsCount);
	emitRooms();
	emitUsers();

	socket.on('create_room', (roomname, username) => {
		rooms.push(roomname);
		socket.join(roomname);
		socket.username = username;
		console.log(socket.username, 'has created the room:', roomname);
		users.push({ id: socket.id, username: username });
		emitRooms();
		emitUsers();
	});
	socket.on('sendMessage', ({ roomname, message }) => {
		socket.to(roomname).broadcast.emit('message', { message: message, name: roomnames[roomname].users[socket.id] });
	});
	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', { username: socket.username });
	});

	socket.on('stopped_tying', ({ roomname }) => {
		socket.to(roomname).emit('stopped_tying');
	});

	socket.on('username', (username) => {
		socket.username = username;
	});
	socket.on('join', (roomname) => {
		socket.join(roomname);
		console.log(socket.username, 'has joined the room:', roomname);
	});

	socket.on('delete_room', (roomname) => {
		console.log(io.sockets.in(roomname));
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});
