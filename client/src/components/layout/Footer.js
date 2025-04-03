import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaVideo, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="py-5">
          <Col md={4} className="mb-4 mb-md-0">
            <h4 className="mb-4"><FaVideo className="me-2" />VideoProConnect</h4>
            <p className="mb-3">Connect with professional videographers for your next project. Find the perfect match for your video needs.</p>
            <div className="social-icons">
              <a href="#" className="me-3"><FaFacebook size={20} /></a>
              <a href="#" className="me-3"><FaTwitter size={20} /></a>
              <a href="#" className="me-3"><FaInstagram size={20} /></a>
              <a href="#" className="me-3"><FaLinkedin size={20} /></a>
            </div>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/">Home</Link></li>
              <li className="mb-2"><Link to="/videographers">Find Videographers</Link></li>
              <li className="mb-2"><Link to="/register">Become a Videographer</Link></li>
              <li className="mb-2"><Link to="/login">Sign In</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="mb-4">Contact Us</h5>
            <p className="mb-2"><FaEnvelope className="me-2" /> support@videoproconnect.com</p>
            <p className="mb-2"><FaPhone className="me-2" /> +1 (555) 123-4567</p>
            <Button variant="primary" className="mt-3 rounded-pill">
              Contact Support
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3 border-top">
            <p className="mb-0">VideoProConnect &copy; {new Date().getFullYear()} | All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
