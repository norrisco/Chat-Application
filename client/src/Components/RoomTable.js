import React from 'react';
import { Button } from 'reactstrap';
import socket from '../socket';
import { Link } from 'react-router-dom';

const RoomTable = (props) => {
	return (
		<tbody>
			{props.rooms.map((room, index) => {
				return (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{room}</td>
						<td>
							<Link to={`/chatroom/${room}`}>
								<Button color="success">Join</Button>
							</Link>
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};
export default RoomTable;
