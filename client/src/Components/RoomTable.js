import React from 'react';
import { Button } from 'reactstrap';
import socket from '../socket';
import { Link } from 'react-router-dom';

const RoomTable = (props) => {
	let username;

	// function join(room) {
	// 	// username = prompt('Please enter your name.');
	// 	// socket.emit('username', username);
	// 	socket.emit('join_room', room);
	// }
	// function deleteRoom(room) {
	// 	socket.emit('delete_room', room);
	// }

	return (
		<tbody>
			{props.rooms.map((room, index) => {
				return (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{room}</td>
						<td>
							<Button color="secondary">Join</Button>
						</td>
						<td>
							<Button color="secondary">Delete</Button>
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};
export default RoomTable;
// join = () => {
// 	let
// };
