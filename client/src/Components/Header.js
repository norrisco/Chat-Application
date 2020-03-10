import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';

class Header extends Component {
	render() {
		return (
			<div>
				<Navbar color="warning" light expand="md">
					<NavbarBrand tag={Link} to="/">
						Chat App
					</NavbarBrand>
					<Nav className="ml" navbar />
				</Navbar>
			</div>
		);
	}
}
export default Header;
