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
