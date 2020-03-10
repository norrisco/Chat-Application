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
const Socket = require('./models/socketSchema');
const socketRouter = require('./routes/socketRoute');
const roomRouter = require('./routes/roomRoute');
const index = require('./routes/index');
const cors = require('cors');
const port = 3001;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

http.listen(port, () => {
	console.log(`listening on port: ${port}`);
});

//routes
// Use Api routes in the App
app.use('/api', index);
app.use('/chat', chatRouter);
app.use('/events', socketRouter);
app.use('/room', roomRouter);

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
	io.emit('rooms', getRooms());
	// emitRooms();
	emitUsers();

	socket.on('create_room', (roomname, username) => {
		rooms.push(roomname);
		socket.join(roomname);
		socket.username = username;
		console.log(socket.username, 'has created the room:', roomname);
		users.push({ id: socket.id, username: username });
		emitRooms();
		emitUsers();

		//save chat to DB
		connect.then((db) => {
			//new document
			let event = new Socket({
				event: 'create_room',
				socketid: socket.id,
				username: socket.username,
				roomname: roomname
			});
			event.save();
		});
	});
	socket.on('sendMessage', (msgObj) => {
		let obj = { sender: msgObj.sender, msg: msgObj.message };
		sendMsg(msgObj.room, obj);

		//save chat to DB
		connect.then((db) => {
			//new document
			let chatMessage = new Chat({ message: msgObj.message, sender: msgObj.sender, roomname: msgObj.room });
			chatMessage.save();
			let event = new Socket({
				event: 'sendMessage',
				socketid: socket.id,
				username: socket.username,
				roomname: roomname
			});
			event.save();
		});
	});

	//is fired when someone is typingf
	socket.on('typing', (obj) => {
		socket.to(obj.room).emit('type', socket.username);
		let event = new Socket({ event: 'typing', socketid: socket.id, username: socket.username, roomname: obj.room });
		event.save();
	});

	socket.on('stopped_typing', (roomname) => {
		console.log(socket.username, 'has stopped typing', roomname);
		socket.to(roomname).emit('stop_typing', socket.username);
		let event = new Socket({
			event: 'stopped_typing',
			socketid: socket.id,
			username: socket.username,
			roomname: roomname
		});
		event.save();
	});

	socket.on('username', (username) => {
		socket.username = username;
	});

	socket.on('join', (roomname) => {
		socket.join(roomname);
		// console.log(socket.username, 'has joined the room:', roomname);
		let data = { user: socket.username, id: socket.id };
		userjoined(data, roomname);
		let event = new Socket({ event: 'join', socketid: socket.id, username: socket.username, roomname: roomname });
		event.save();
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});
