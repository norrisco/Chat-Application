import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const RoomTable = (props) => {
	const [ username, setUsername ] = useState('');

	// function handleSetusername() {
	// 	if (username === '') {
	// 		const user = prompt('What is your name?');
	// 		setUsername(user);
	// 	}
	// }
	return (
		<tbody>
			{props.rooms.map((room, index) => {
				return (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{room}</td>
						<td>
							<Link to={{ pathname: `/chatroom/${room}`, username: username, roomName: room }}>
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
// onClick={handleSetusername}
