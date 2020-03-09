import React, { Component } from 'react';
import { Row } from 'reactstrap';

class Chats extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>{this.props.friend}</div>;
	}
}
export default Chats;
