import React, { Component } from 'react';
import { Button, Row, Col, Input } from 'reactstrap';
import socket from './../socket';

class CreateRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomName: ''
		};
	}
	handleChange = (e) => {
		this.setState({ roomName: e.target.value });
	};
	handleClick = () => {
		socket.emit('create_room', this.state.roomName);
		// this.state.rooms.push(this.state.roomName);
	};

	render() {
		return (
			<React.Fragment>
				<Row>
					<Col>
						<Input
							type="text"
							name="text"
							id="roomName"
							placeholder="Room name"
							onChange={this.handleChange}
						/>
					</Col>
					<Col>
						<Button color="secondary" onClick={this.handleClick}>
							Create
						</Button>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
export default CreateRoom;
