const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const connect = require('./dbConnection');
const Chat = require('./models/chatSchema');
const chatRouter = require('./routes/chatRoute');
const index = require('./routes/index');

const port = 3001;
app.use(express.static(path.join(__dirname, '..', 'public')));
`				`;
http.listen(port, () => {
	console.log(`listening on port: ${port}`);
});

//routes
// app.use('/', index);
app.use('/chat', chatRouter);

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
const userjoined = (data, roomname) => {
	// io.emit('broadcast', username);
	io.to(roomname).emit('broadcast', data);
};
const sendMsg = (roomname, data) => {
	io.to(roomname).emit('received', data);
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
	socket.on('sendMessage', (msgObj) => {
		console.log(msgObj.room);
		// socket.to(roomname).broadcast.emit('message', { message: message, name: roomnames[roomname].users[socket.id] });
		console.log('sender:', msgObj.sender, 'msg:', msgObj.message, 'room', msgObj.room);
		let obj = { sender: msgObj.sender, msg: msgObj.message };
		// socket.in(msgObj.room).emit('received', obj);
		sendMsg(msgObj.room, obj);
		//save chat to DB
		connect.then((db) => {
			//new document
			let chatMessage = new Chat({ message: msgObj.message, sender: msgObj.sender });
			chatMessage.save();
			//console.log("- message saved to database");
		});
	});
	socket.on('typing', (obj) => {
		// socket.broadcast.emit('typing', { username: socket.username });
		socket.to(obj.room).emit('type', socket.username);
		console.log(socket.username, 'is typing');
	});

	socket.on('stopped_typing', (roomname) => {
		console.log(socket.username, 'has stopped typing', roomname);
		socket.to(roomname).emit('stop_typing', socket.username);
	});

	socket.on('username', (username) => {
		socket.username = username;
	});

	socket.on('join', (roomname) => {
		socket.join(roomname);
		// console.log(socket.username, 'has joined the room:', roomname);
		let data = { user: socket.username, id: socket.id };
		userjoined(data, roomname);
	});

	// socket.on('delete_room', (roomname) => {
	// 	console.log(io.sockets.in(roomname));
	// });

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});
