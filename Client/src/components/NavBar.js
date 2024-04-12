import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';  

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-indigo-600">
      <Container>
        <Navbar.Brand as={Link} to="/LandingPage" className=' text-white'>E-Learning</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Courses" className=' text-white'>Courses</Nav.Link>
            <Nav.Link as={Link} to="/Events" className=' text-white'>Events</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login" className=' text-white'>Log Out</Nav.Link>
            <Nav.Link eventKey={2} href="#memes" className=' text-white'>
              Change Theme
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;