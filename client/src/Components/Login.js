import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Lobby from './Lobby';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		};
	}
	handleUsername = (e) => {
		this.setState(
			{
				username: e.target.value
			},
			console.log(this.state.username)
		);
	};
	onSubmit = () => {
		// This is pseudo code so you want to handle login somewhere
		// when that is done you can call your onUsernameChange
		this.props.onUsernameChange(this.state.username);
	};
	render() {
		return (
			<div>
				<h1>Log in Page</h1>
				<input type="text" placeholder="Name" onChange={this.handleUsername} />
				<Link to="/lobby">
					<button onClick={this.onSubmit}>Log in</button>
				</Link>
			</div>
		);
	}
}

export default Login;
