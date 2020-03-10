import React, { Component } from 'react';
import { Row } from 'reactstrap';

const Joins = (props) => {
	return (
		<div>
			<Row>
				<div>{props.friend} has joined the chat.</div>
			</Row>
		</div>
	);
};
export default Joins;
