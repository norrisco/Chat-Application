import React, { Component, useState } from 'react';
import './Chatroom.css';
import { Input, Button, Row } from 'reactstrap';
import socket from '../socket';
import Joins from './Joins';

class Chatroom extends Component {
	constructor() {
		super();
		this.state = {
			message: '',
			username: '',
			roomName: '',
			friend: '',
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
	handleMessage = (e) => {
		this.setState({ message: e.target.value });
		socket.emit('typing', this.state.roomName);
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
	}
	joined = (id) => {
		this.setState({
			chats: [ ...this.state.chats, <Joins key={id} friend={this.state.friend} /> ]
		});
	};
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
				<form id="sendContainer">
					<Input
						type="text"
						name="text"
						id="messageInput"
						placeholder="Type your message here:"
						value={this.state.message}
						onChange={this.handleMessage}
						onKeyPress={this.typing}
						// onKeyUp={this.stopType}
					/>
					<Button color="primary">Send</Button>
				</form>
			</div>
		);
	}
}
export default Chatroom;
