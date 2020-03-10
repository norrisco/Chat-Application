import React, { Component } from 'react';
import { Table } from 'reactstrap';

class SocketApi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			events: []
		};
	}

	componentDidMount() {
		fetch('http://localhost:3001/events').then((response) => response.json()).then(
			// handle the result
			(result) => {
				this.setState({
					isLoaded: true,
					events: result
				});
			},
			// Handle error
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		);
	}
	render() {
		const { error, isLoaded, events } = this.state;

		if (error) {
			return <div>Error in loading</div>;
		} else if (!isLoaded) {
			return <div>Loading ...</div>;
		} else {
			return (
				<div>
					<Table bordered>
						<thead>
							<tr>
								<th>#</th>
								<th>Event type</th>
								<th>User</th>
								<th>Room Name</th>
								<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>
							{events.map((event, index) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{event.event}</td>
										<td>{event.username}</td>
										<td>{event.roomname}</td>
										<td>{event.createdAt}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			);
		}
	}
}
export default SocketApi;
