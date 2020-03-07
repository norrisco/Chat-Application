import React, { Component } from 'react';
import Layout from './Containers/Layout';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		};
	}

	render() {
		return (
			<React.Fragment>
				<BrowserRouter>
					<Switch>
						<Route path="/" component={Layout} />
					</Switch>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default App;
// <Route path="/login" render={()=><LoginPage onUsernameChange={this.onUsernameChange}/>
//       <Route path="/account" render={() => <AccountItem username={this.state.username} />} />
// <Route path="/" exact component={Login} />
// 						<Route path="/lobby" exact component={Lobby} />
//
// <Route path="/" render={() => <Login onUsernameChange={this.onUsernameChange} />} />
// <Route path="/lobby" exact component={Lobby} />} />
// <Route path="/chatRoom" exact component={Chatroom} />
