import React from 'react';
import { Row } from 'reactstrap';

const Chats = (props) => {
	return (
		<div>
			<Row>
				<div>
					{props.sender}:{props.message}
				</div>
			</Row>
		</div>
	);
};
export default Chats;
