import React, { Component } from 'react';
import './Chatroom.css';
import { Input, Button } from 'reactstrap';
import socket from '../socket';

class Chatroom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			username: '',
			roomName: '',
			rooms: []
		};
	}
	handleMessage = (e) => {
		this.setState({ message: e.target.value });
	};
	sendMessage = (e) => {
		e.preventDefault();
		const room = this.state.roomName;
		const message = this.state.message;
	};
	getUsername = () => {
		const user = this.props.location.username;
		this.setState({ username: user });
	};

	componentDidMount() {
		this.getUsername();
	}

	render() {
		// console.log(this.state.user);
		return (
			<div className="Chatroom">
				Hello, {this.state.username}
				<div id="messageContainer" />
				<form id="sendContainer">
					<Input
						type="text"
						name="text"
						id="messageInput"
						placeholder="Type your message here:"
						value={this.state.message}
						onChange={this.handleMessage}
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
