import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from "react-bootstrap";
import "./NavbarElements.css";
import logo from "../../Image/LOGO.jpeg";
import axios from 'axios';

const NavbarComp = () => {
  const [tnavbar, setTnavbar] = useState(false);

  const changeNavbar = () => {
    if (window.scrollY >= 80) {
      setTnavbar(true);
    } else {
      setTnavbar(false);
    }
  };

  const handleLogout = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:8080/logout"
    }).then((res) => {
      console.log(res);
      localStorage.removeItem('name');
      localStorage.removeItem('logged', false);
      localStorage.removeItem('email');
      window.location.reload();
    })
  }

  window.addEventListener("scroll", changeNavbar);
  const isLogged = localStorage.getItem('logged');
  const name = localStorage.getItem('name');
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
          <Navbar.Brand>
            <img to="/" alt ="logo" src={logo} width="80px" height="60px" margin-left="0px" />
            <Link style={{ textDecoration: "none", color: "black", fontWeight: "600", fontSize: "20px", margin: "0 4px" }} to="/">Travel Geographic</Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link style={{ textDecoration: "none", color: "black", fontWeight: "600", fontSize: "20px", margin: "0 4px" }} to="/gallery">Gallery</Link>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <Link style={{ textDecoration: "none", color: "black", fontWeight: "600", fontSize: "20px", margin: "0 4px" }} to="/expedition">Expeditions</Link>
              </Nav.Link>
              {/* <Nav.Link>
                <Link style={{ textDecoration: "none", color: "black", fontWeight: "600", fontSize: "20px", margin: "0 4px" }} to="/trek">Trek</Link>
              </Nav.Link> */}
              {!isLogged ? (
                <>
                  <Nav.Link>
                    <Link style={{ textDecoration: "none", color: "black", fontWeight: "600", fontSize: "20px", margin: "0 4px" }} to="/login">Login</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link style={{ textDecoration: "none", color: "black", fontWeight: "600", fontSize: "20px", margin: "0 4px" }} to="/signup">Signup</Link>
                  </Nav.Link>
                </>
              ) :
                (
                  <>
                    <Nav.Link onClick={handleLogout}>
                      <Link style={{ textDecoration: "none", color: "black", fontWeight: "600", fontSize: "20px", margin: "0 4px" }} >Logout</Link>
                    </Nav.Link>
                    <Nav.Link style={{ textDecoration: "none", color: "black", fontWeight: "600", fontSize: "20px", margin: "0 4px" }}>
                      Hi {name}
                    </Nav.Link>
                  </>
                )
              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default withRouter(NavbarComp);