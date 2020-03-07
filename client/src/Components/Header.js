import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends Component {
	render() {
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand tag={Link} to="/">
						Chat App
					</NavbarBrand>

					<Nav className="ml" navbar>
						<NavItem>
							<NavLink tag={Link} to="/Chatroom">
								Chatroom
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to="/liveVisitors">
								Live Visitors
							</NavLink>
						</NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	}
}
export default Header;
// <NavbarToggler onClick={this.toggle} />
// state = {
// 	isOpen: false
// };

// toggle = () => {
// 	this.setState({
// 		isOpen: !this.state.isOpen
// 	});
// };
