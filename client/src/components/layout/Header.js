import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaVideo, FaUser, FaSignInAlt, FaUserPlus, FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
  // This will be replaced with actual Redux state once we set it up
  const userInfo = null;
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check if user has a preference stored
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'false') {
      setDarkMode(false);
      document.body.classList.remove('dark-mode');
    } else {
      // Default to dark mode
      localStorage.setItem('darkMode', 'true');
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    }
    setDarkMode(!darkMode);
  };

  const logoutHandler = () => {
    // Will be implemented with Redux
    console.log('Logout');
  };

  return (
    <header>
      <Navbar bg="white" expand="lg" collapseOnSelect className="py-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <FaVideo className="me-2" />
            <span>VideoProConnect</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/videographers" className="me-3">
                <FaVideo className="me-1" /> Videographers
              </Nav.Link>
              <Nav.Link onClick={toggleDarkMode} className="me-3 theme-toggle">
                {darkMode ? <FaSun className="text-warning" /> : <FaMoon />}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown
                  title={
                    <span>
                      <img
                        src={userInfo.profileImage || 'https://via.placeholder.com/40'}
                        alt={userInfo.name}
                        className="profile-image me-2"
                        width="30"
                        height="30"
                      />
                      {userInfo.name}
                    </span>
                  }
                  id="username"
                >
                  <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="me-3">
                    <FaSignInAlt className="me-1" /> Sign In
                  </Nav.Link>
                  <Button
                    as={Link}
                    to="/register"
                    variant="primary"
                    className="rounded-pill px-4"
                  >
                    <FaUserPlus className="me-1" /> Sign Up
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
