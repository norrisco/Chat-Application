import React, { Component } from 'react';
import { Table, Button, Row, Col, Container } from 'reactstrap';
import CreateRoom from './CreateRoom';
import { Link } from 'react-router-dom';
import socket from './../socket';

class Lobby extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: []
		};
	}
	updateTable = () => {
		return this.state.rooms.map((room, index) => {
			return (
				<tr key="index">
					<td>{index + 1}</td>
					<td>{room}</td>
					<td>
						<Button color="secondary">Join</Button>
					</td>
				</tr>
			);
		});
	};

	getData = () => {
		socket.on('rooms', (room) => {
			this.setState({ rooms: room });
		});
	};
	componentDidMount() {
		this.getData();
		this.updateTable();
	}

	render() {
		return (
			<Container>
				<Row>
					<Col>
						<Table>
							<thead>
								<tr>
									<th>Room Number</th>
									<th>Room Name</th>
									<th>Join Room</th>
								</tr>
							</thead>
							<tbody>{this.updateTable()}</tbody>
						</Table>
					</Col>
					<Col>
						<CreateRoom />
					</Col>
				</Row>
			</Container>
		);
	}
}
export default Lobby;
