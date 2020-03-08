import React, { Component } from 'react';
import { Table, Row, Col, Container } from 'reactstrap';
import CreateRoom from './CreateRoom';

import socket from './../socket';
import RoomTable from './RoomTable';

class Lobby extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: []
		};
	}
	getData = () => {
		socket.on('rooms', (room) => {
			this.setState({ rooms: room });
		});
	};
	componentDidMount() {
		this.getData();
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
									<th />
									<th />
								</tr>
							</thead>
							<RoomTable rooms={this.state.rooms} />
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
