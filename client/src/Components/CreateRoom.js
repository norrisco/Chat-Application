import React, { Component, useState } from 'react';
import { Button, Row, Col, Input, FormGroup, Label, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import socket from './../socket';

class CreateRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomName: '',
			username: '',
			visible: false,
			rooms: []
		};
	}
	onDismiss = () => {
		this.setState({ visible: false });
	};
	handleChange = (e) => {
		this.setState({ roomName: e.target.value });
	};
	handleUsername = (e) => {
		this.setState({ username: e.target.value });
	};

	handleClick = (e) => {
		let includes = this.props.rooms.includes(this.state.roomName);
		if (this.state.roomName === '' || this.state.username === '' || includes === true) {
			e.preventDefault();
			this.setState({ visible: true });
		} else {
			socket.emit('create_room', this.state.roomName, this.state.username);
			this.setState({ roomName: '', username: '' });
			this.onDismiss();
		}
	};

	render() {
		return (
			<React.Fragment>
				<Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss} fade={false}>
					Make sure room is not created yet and please fill in the following:
				</Alert>
				<FormGroup>
					<Label for="roomName">Room name:</Label>
					<Input
						type="text"
						name="text"
						id="roomName"
						placeholder="bbbrrROOM"
						value={this.state.roomName}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="username">Username:</Label>
					<Input
						type="text"
						name="text"
						id="username"
						placeholder="coolkid555"
						value={this.state.username}
						onChange={this.handleUsername}
					/>
				</FormGroup>
				<FormGroup>
					<Link to={`/chatroom/${this.state.roomName}`}>
						<Button color="primary" onClick={this.handleClick}>
							Create
						</Button>
					</Link>
				</FormGroup>
			</React.Fragment>
		);
	}
}
export default CreateRoom;
