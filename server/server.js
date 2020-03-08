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
	socket.on('message', ({ room, message }) => {
		socket.to(room).emit('message', {
			message,
			name: socket.username
		});
	});
	socket.on('typing', ({ room }) => {
		socket.to(room).emit('typing', 'Someone is typing');
	});

	socket.on('stopped_tying', ({ room }) => {
		socket.to(room).emit('stopped_tying');
	});

	socket.on('username', (username) => {
		socket.username = username;
		console.log('THIS IS FROM SERVER: hi ', socket.username);
		console.log(socket);
	});
	socket.on('join', ({ roomName, username }, callback) => {
		socket.username = username;
		socket.join(roomName);
	});

	socket.on('delete_room', (roomName) => {
		console.log(io.sockets.in(roomName));
	});

	//when someone creates a room
	//room gets created and displyed in the lobby
	//user gets automatically join to roomchat with roomname
	//user has to assign its user name

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});
