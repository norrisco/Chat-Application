import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import routes from '../routes';
import Header from '../Components/Header';

class Layout extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Container>
					<Row>
						<Switch>
							{routes.map((route, index) => {
								return route.Component ? (
									<Route
										key={index}
										path={route.path}
										exact={route.exact}
										render={(props) => <route.Component {...props} />}
									/>
								) : null;
							})}
						</Switch>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}

export default Layout;

// <Route path="/Chatroom" exact component={Chatroom} />
// <Route path="/liveVisitors" exact component={LiveVisitors} />
