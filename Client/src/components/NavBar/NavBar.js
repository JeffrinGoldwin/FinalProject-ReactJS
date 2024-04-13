import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';  

function NavBar() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <Navbar collapseOnSelect expand="lg" className={`bg-indigo-600 ${theme === 'dark' ? 'dark:bg-indigo-700' : ''}`}>
      <Container>
        <Navbar.Brand as={Link} to="/LandingPage" className="text-white">E-Learning</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Courses" className="text-white">Courses</Nav.Link>
            <Nav.Link as={Link} to="/Events" className="text-white">Events</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login" className="text-white">Log Out</Nav.Link>
            <Nav.Link eventKey={2} onClick={handleThemeSwitch} className="text-white">
              Change Theme
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
