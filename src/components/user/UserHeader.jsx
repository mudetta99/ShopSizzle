import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBox, FaPlus, FaUserPlus, FaSignInAlt, FaShoppingCart } from 'react-icons/fa';
import '../../css/Header.css'; 
import { useSelector } from 'react-redux';

function UserHeader() {


  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
          <span className="gradient-text">ShopSizzle</span>
          {/* <span className="brand-subtitle">ShopSizzle</span> */}
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
              to="/home/all products" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active-link' : ''}`
              }
            >
              <FaBox className="nav-icon" />
              Products
            </Nav.Link>

            <Nav.Link 
              as={NavLink} 
              to="/user/cart" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active-link' : ''}`
              }
            >
              <FaShoppingCart className="nav-icon" />
              Cart
            </Nav.Link>

            <Nav.Link 
              as={NavLink} 
              to="/login" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active-link' : ''}`
              }
            >
              <FaSignInAlt className="nav-icon" />
              Login
            </Nav.Link>

            <Nav.Link 
              as={NavLink} 
              to="/register" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active-link' : ''}`
              }
            >
              <FaUserPlus className="nav-icon" />
              Register
            </Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserHeader;