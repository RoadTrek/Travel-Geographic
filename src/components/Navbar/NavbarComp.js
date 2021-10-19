import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const NavbarComp = () => {

	const [tnavbar, setTnavbar] = useState(false);

	useEffect(() => {
		// console.log()
	}, []);

	const changeNavbar = () => {
		if(window.scrollY >= 80) {
			setTnavbar(true);
		}
		else {
			setTnavbar(false);
		}
	}

	window.addEventListener('scroll', changeNavbar);

	return (
		<>
			<Navbar scrolling dark expand="md" fixed="top" collapseOnSelect bg={tnavbar ? "info" : "transparent"} variant={tnavbar ? "dark" : "light"}>
				<Container>
					<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="#features">Features</Nav.Link>
							<Nav.Link href="#pricing">Pricing</Nav.Link>
							<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Nav>
							<Nav.Link href="#deets">More deets</Nav.Link>
							<Nav.Link eventKey={2} href="#memes">
								Dank memes
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavbarComp;
