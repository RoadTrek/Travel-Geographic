import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./NavbarElements.css";
import logo from "../../Image/LOGO.jpeg";
import axios from "axios";

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
      url: "http://localhost:8080/logout",
    }).then((res) => {
      console.log(res);
      localStorage.removeItem("name");
      localStorage.removeItem("logged", false);
      localStorage.removeItem("email");
      window.location.reload();
    });
  };

  window.addEventListener("scroll", changeNavbar);
  const isLogged = localStorage.getItem("logged");
  const name = localStorage.getItem("name");
  return (
    <>
      <Navbar
        scrolling
        dark
        expand="md"
        fixed="top"
        collapseOnSelect
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand>
            <img
              to="/"
              alt="logo"
              src={logo}
              width="80px"
              height="60px"
              margin-left="0px"
            />
            <Link
              style={{
                textDecoration: "none",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "20px",
                margin: "0 4px",
                fontFamily: "'Montserrat',sans-serif",
              }}
              to="/"
            >
              TRAVELGEOGRAPHIC
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link>
                <Link className="link" to="/gallery">
                  Gallery
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="link" to="/expedition">
                  Expeditions
                </Link>
              </Nav.Link>
              {!isLogged ? (
                <>
                  <Nav.Link>
                    <Link className="link" to="/login">
                      Login
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="link" to="/signup">
                      Signup
                    </Link>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleLogout}>
                    <Link className="link" to="/">
                      Logout
                    </Link>
                  </Nav.Link>
                  <Nav.Link
                    style={{
                      textDecoration: "none",
                      color: "#ffffff",
                      fontWeight: "350",
                      fontSize: "19px",
                      margin: "0 4px",
                      fontFamily: "'Montserrat',sans-serif",
                    }}
                  >
                    <Link className="link" to="/profile">
                      Hi {name}
                    </Link>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default withRouter(NavbarComp);
