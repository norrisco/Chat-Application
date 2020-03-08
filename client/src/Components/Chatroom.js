import React, { Component } from 'react';
import './Chatroom.css';
// // import { Table, Button, Row, Col, Container } from 'reactstrap';
// import CreateRoom from './CreateRoom';
import socket from '../socket';

class Chatroom extends Component {
	render() {
		return (
			<div className="Chatroom">
				<div id="message-container" />
				<form id="send-container">
					<input type="text" id="message-input" />
					<button type="submit" id="send-button">
						Send
					</button>
				</form>
			</div>
		);
	}
}
export default Chatroom;
