import React from 'react';
import { ListGroupItem } from 'reactstrap';

const Chats = (props) => {
	return (
		<ListGroupItem>
			{props.sender} : {props.message}
		</ListGroupItem>
	);
};
export default Chats;
