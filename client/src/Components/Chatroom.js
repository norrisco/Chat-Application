import React, { Component, useState } from 'react';
import './Chatroom.css';
import { Input, Button, Row } from 'reactstrap';
import socket from '../socket';
import Joins from './Joins';
import Chats from './Chats';

class Chatroom extends Component {
	constructor() {
		super();
		let typingTimer = null;
		this.handleMessage = this.handleMessage.bind(this);
		this.state = {
			message: '',
			username: '',
			roomName: '',
			friend: '',
			sender: '',
			chats: [],
			isTyping: false,
			timeout: 0
		};
	}
	prompUserData(room) {
		let user = prompt('what is your name?');
		this.setState({ username: user });
		socket.emit('username', user);
		socket.emit('join', room);
	}

	getData = () => {
		const user = this.props.location.username;
		const room = this.props.location.roomName;
		this.setState({ username: user, roomName: room });
		if (user === '') {
			this.prompUserData(room);
			return;
		}
	};
	typingTimeout = () => {
		this.setState({
			isTyping: false
		});
	};

	handleMessage = (e) => {
		this.setState({ message: e.target.value });
		if (this._timeout) {
			//if there is already a timeout in process cancel it
			clearTimeout(this._timeout);
		}
		this._timeout = setTimeout(() => {
			this._timeout = null;
			socket.emit('stopped_typing', this.state.roomName);
		}, 1000);
	};

	typing = (e) => {
		let obj = { room: this.state.roomName, typing: true };
		socket.emit('typing', obj);
	};

	joined = (id) => {
		this.setState({
			chats: [ ...this.state.chats, <Joins key={id} friend={this.state.friend} /> ]
		});
	};
	sendMsg = (e) => {
		e.preventDefault();
		let msg = { message: this.state.message, sender: this.state.username, room: this.state.roomName };
		socket.emit('sendMessage', msg);
		this.setState({ message: '' });
	};
	send = (data) => {
		console.log('this is the message:', data.msg);
		this.setState({
			chats: [ ...this.state.chats, <Chats sender={data.sender} message={data.msg} /> ]
		});
	};
	componentDidMount() {
		this.getData();
		socket.on('broadcast', (data) => {
			this.setState({ friend: data.user });
			this.joined(data.id);
		});
		socket.on('type', (username) => {
			this.setState({ typer: username, isTyping: true });
		});
		socket.on('stop_typing', (username) => {
			this.setState({ isTyping: false });
		});
		socket.on('received', (data) => {
			this.send(data);
			console.log(data.sender, ':', data.msg);
		});
	}
	componentWillUnmount() {
		clearTimeout(this.typingTimer);
	}
	render() {
		return (
			<div className="Chatroom">
				<Row>Hello, {this.state.username}</Row>
				<Row>
					<div id="messageContainer">
						{this.state.chats}
						{this.state.isTyping ? <p>{this.state.typer} is typing....</p> : null}
					</div>
				</Row>
				<form id="sendContainer" onSubmit={this.sendMsg}>
					<Input
						type="text"
						name="text"
						id="messageInput"
						placeholder="Type your message here:"
						value={this.state.message}
						onChange={this.handleMessage}
						onKeyPress={this.typing}
					/>
					<Button color="primary" onClick={this.sendMsg}>
						Send
					</Button>
				</form>
			</div>
		);
	}
}
export default Chatroom;
