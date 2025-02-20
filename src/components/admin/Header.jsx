import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBox, FaPlus } from 'react-icons/fa';
import '../../css/Header.css'; 
import { useSelector } from 'react-redux';

function Header() {


  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
          <span className="gradient-text">CRUD</span>
          <span className="brand-subtitle">Premium</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active-link' : ''}`
              }
            >
              <FaHome className="nav-icon" />
              Home
            </Nav.Link>

            <Nav.Link 
              as={NavLink} 
              to="/products" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active-link' : ''}`
              }
            >
              <FaBox className="nav-icon" />
              Products
            </Nav.Link>

            <Nav.Link 
              as={NavLink} 
              to="products/0/edit" 
              className="cta-button"
            >
              <FaPlus className="nav-icon" />
              Create New
            </Nav.Link>



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;