import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import '../../css/Footer.css';

export default function Footer() {
  return (
    <footer className="luxury-footer">
      <Container>
        <Row className="g-4">
          <Col md={4} className="text-center text-md-start">
            <div className="footer-section">
              <h5 className="footer-heading">ShopSizzle</h5>
              <p className="footer-text">
                Elevating data management to luxury standards with cutting-edge solutions 
                and premium user experiences.
              </p>
            </div>
          </Col>
          
          <Col md={4} className="text-center">
            <div className="footer-section">
              <h5 className="footer-heading">Quick Navigation</h5>
              <ul className="footer-links">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/home/all products" className="footer-link">Products</a></li>
                <li><a href="/contact" className="footer-link">Support</a></li>
              </ul>
            </div>
          </Col>
          
          <Col md={4} className="text-center text-md-end">
            <div className="footer-section">
              <h5 className="footer-heading">Connect With Us</h5>
              <div className="social-links">
                <a href="#" className="social-icon"><FaFacebook /></a>
                <a href="#" className="social-icon"><FaTwitter /></a>
                <a href="#" className="social-icon"><FaInstagram /></a>
                <a href="#" className="social-icon"><FaLinkedin /></a>
              </div>
            </div>
          </Col>
        </Row>
        
        <div className="footer-divider"></div>
        
        <Row>
          <Col className="text-center">
            <p className="footer-copyright">
              © {new Date().getFullYear()} ShopSizzle . 
              <span className="d-block d-md-inline"> All rights reserved.</span> <br />
              <span className="d-block d-md-inline"> © Kareem&Emad</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}