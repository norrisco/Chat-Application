import React, { Component } from 'react';
import './Chatroom.css';
import { Input, Button, Row } from 'reactstrap';
import socket from '../socket';

class Chatroom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			username: '',
			roomName: '',
			rooms: [],
			isTyping: false,
			friend: ''
		};
	}
	handleMessage = (e) => {
		socket.emit('typing', this.state.roomName);
		this.setState({ message: e.target.value, isTyping: true });
	};

	sendMessage = (e) => {
		e.preventDefault();
		const message = this.state.message;
	};
	getData = () => {
		const user = this.props.location.username;
		const room = this.props.location.roomName;
		this.setState({ username: user, roomName: room });
		if (user === '') {
			console.log('USER IS EMPTY THIS SHOULD PROMPT');
			this.prompUserData(room);
			return;
		}
	};

	listenTyping = () => {
		socket.on('typing', (data) => {
			console.log(data.username, 'is typing');
		});
	};
	handleKeyPress = (e) => {
		socket.emit('typing');
		this.setState({ isTyping: true });
	};

	prompUserData(room) {
		let user = prompt('what is your name?');
		this.setState({ username: user });
		socket.emit('username', user);
		socket.emit('join', room);
		socket.on('joined_room', (username) => {
			console.log(username);
		});
	}
	componentDidMount() {
		this.getData();
	}

	render() {
		return (
			<div className="Chatroom">
				<Row>Hello, {this.state.username}</Row>
				<Row>
					<div id="messageContainer" />
					{this.state.isTyping ? this.listenTyping : null}
				</Row>
				<form id="sendContainer">
					<Input
						type="text"
						name="text"
						id="messageInput"
						placeholder="Type your message here:"
						value={this.state.message}
						onChange={this.handleMessage}
						onKeyPress={this.handleKeyPress}
					/>
					<Button color="primary" onClick={this.sendMessage}>
						Send
					</Button>
				</form>
			</div>
		);
	}
}
export default Chatroom;
