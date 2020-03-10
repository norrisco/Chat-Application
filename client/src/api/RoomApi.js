import React, { Component } from 'react';
import { Table } from 'reactstrap';

class RoomApi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			history: []
		};
	}

	componentDidMount() {
		let param = this.props.location.search;
		var params = param.split('=')[1];

		fetch(`http://localhost:3001/room/roomname=${params}`).then((response) => response.json()).then(
			// handle the result
			(result) => {
				this.setState({
					isLoaded: true,
					history: result
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
		const { error, isLoaded, history } = this.state;

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
								<th>Room name</th>
								<th>User</th>
								<th>Message</th>
								<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>
							{history.map((message, index) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{message.roomname}</td>
										<td>{message.sender}</td>
										<td>{message.message}</td>
										<td>{message.createdAt}</td>
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
export default RoomApi;
