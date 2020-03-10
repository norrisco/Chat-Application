import React, { Component } from 'react';
import { Row } from 'reactstrap';

class Chats extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div>{this.props.friend} has joined the chat.</div>
			</div>
		);
	}
}
export default Chats;
