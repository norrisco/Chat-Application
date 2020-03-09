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
		users.push({ id: socket.id, username: username });
		emitRooms();
		emitUsers();
	});
	socket.on('sendMessage', ({ roomname, message }) => {
		socket.to(roomname).broadcast.emit('message', { message: message, name: roomnames[roomname].users[socket.id] });
	});
	socket.on('typing', ({ roomname }) => {
		socket.to(roomname).emit('typing', 'Someone is typing');
	});

	socket.on('stopped_tying', ({ roomname }) => {
		socket.to(roomname).emit('stopped_tying');
	});

	socket.emit('username', () => {
		console.log(socket.username);
		return socket.username;
	});
	socket.on('join', (roomname, username) => {
		socket.username = username;
		socket.join(roomname);
	});

	socket.on('delete_room', (roomname) => {
		console.log(io.sockets.in(roomname));
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});
