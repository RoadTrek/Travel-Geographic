import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav,NavLink } from "react-bootstrap";
import "./NavbarElements.css";
import logo from "../../Image/LOGO.jpeg";
import axios from "axios";
import {Redirect} from "react-router-dom";

const NavbarComp = (params) => {
    console.log(params.data.name);
  const [tnavbar, setTnavbar] = useState(false);
    const [redirect,setRedirect]=useState();
  const changeNavbar = () => {
    if (window.scrollY >= 80) {
      setTnavbar(true);
    } else {
      setTnavbar(false);
    }
  };
function handleLogout(){
    axios({
        method:"POST",
        withCredentials:true,
        url:"http://localhost:8080/logout"
    }).then((res)=>{
        console.log(res);
        window.location.reload();
        setRedirect(true);
    })
}
useEffect(() => {
    if(redirect){
        <Redirect to="/"/>
    }
  }, [redirect]);

  window.addEventListener("scroll", changeNavbar);

  return (
    <>
      <Navbar
        scrolling
        dark
        expand="md"
        fixed="top"
        collapseOnSelect
        bg={tnavbar ? "dark" : "transparent"}
        variant={tnavbar ? "dark" : "light"}
      >
        <Container>
          <Navbar.Brand href="/">
			  <img src={logo} width="80px" height="60px" margin-left="0px" alt="logo"/>
			  Travel Geographic
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/gallery">Gallery</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
							</NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link href="/expedition">Expeditions</Nav.Link>
              <Nav.Link href="/trek">Treks</Nav.Link>
              <Nav.Link onClick={handleLogout}>
                Logout
              </Nav.Link>
              <Nav.Link eventKey={2} href="/signup">
                Hi {params.data.name}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;