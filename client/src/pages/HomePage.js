import React from 'react';
import { Row, Col, Button, Container, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserTie, FaVideo, FaCalendarCheck, FaStar, FaArrowRight, FaCheck } from 'react-icons/fa';

const HomePage = () => {
  return (
    <>
      <div className="hero-section py-5 text-center text-white mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-lg-start mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Find the Perfect Videographer for Your Project</h1>
              <p className="lead mb-4">
                Connect with professional videographers for weddings, events, commercials, and more. Get matched with the right talent for your specific needs.
              </p>
              <div className="d-flex gap-3">
                <Link to="/videographers">
                  <Button variant="primary" size="lg" className="rounded-pill px-4 py-3">
                    <FaSearch className="me-2" /> Find Videographers
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-light" size="lg" className="rounded-pill px-4 py-3">
                    <FaVideo className="me-2" /> Join as Videographer
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div className="position-relative">
                <Image
                  src="https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Sports Videographer"
                  className="img-fluid rounded-3 shadow-lg"
                />
                <div className="position-absolute top-0 start-0 translate-middle bg-white p-3 rounded-circle shadow-lg">
                  <FaStar className="text-warning" size={30} />
                </div>
                <div className="position-absolute bottom-0 end-0 translate-middle-y bg-white p-3 rounded shadow-lg">
                  <p className="mb-0 fw-bold">500+ Professional Videographers</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold mb-3">How It Works</h2>
            <p className="lead text-muted mb-0">Simple steps to find and book the perfect videographer for sports, events, and more</p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4 text-center">
                <div className="icon-wrapper mb-4 mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <FaSearch size={30} />
                </div>
                <Card.Title className="fw-bold mb-3">Search</Card.Title>
                <Card.Text className="text-muted">
                  Browse through our extensive network of professional videographers specializing in sports, events, weddings and more. Filter by location, specialization, and price range.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-0 pb-4">
                <Link to="/videographers">
                  <Button variant="outline-primary" className="rounded-pill px-4">
                    Browse Videographers <FaArrowRight className="ms-2" />
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4 text-center">
                <div className="icon-wrapper mb-4 mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <FaUserTie size={30} />
                </div>
                <Card.Title className="fw-bold mb-3">Connect</Card.Title>
                <Card.Text className="text-muted">
                  Review portfolios, check ratings, and connect directly with videographers that match your project requirements.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-0 pb-4">
                <Link to="/register">
                  <Button variant="outline-primary" className="rounded-pill px-4">
                    Create Account <FaArrowRight className="ms-2" />
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4 text-center">
                <div className="icon-wrapper mb-4 mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <FaCalendarCheck size={30} />
                </div>
                <Card.Title className="fw-bold mb-3">Book & Pay</Card.Title>
                <Card.Text className="text-muted">
                  Schedule your booking, make secure payments, and enjoy professional video services with confidence.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-0 pb-4">
                <Link to="/register">
                  <Button variant="outline-primary" className="rounded-pill px-4">
                    Get Started <FaArrowRight className="ms-2" />
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="bg-light py-5 mt-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">Featured Videographers</h2>
              <p className="lead text-muted mb-0">Discover our top-rated professionals</p>
            </Col>
          </Row>

          <Row className="g-4">
            {/* This will be replaced with actual data from the backend */}
            {[1, 2, 3].map((item) => (
              <Col key={item} md={4}>
                <Card className="videographer-card h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={item === 1 ?
                        "https://images.unsplash.com/photo-1574271143515-5cddf8da19be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" :
                        item === 2 ?
                        "https://images.unsplash.com/photo-1533779088228-9db21617b403?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" :
                        "https://images.unsplash.com/photo-1532098530638-cc52d7f83b75?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      }
                      alt={item === 1 ? "Sports Videographer" : item === 2 ? "Event Videographer" : "Wedding Videographer"}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-primary rounded-pill px-3 py-2">Top Rated</span>
                    </div>
                  </div>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <Image
                        src={`https://randomuser.me/api/portraits/men/${item + 30}.jpg`}
                        roundedCircle
                        width={50}
                        height={50}
                        className="me-3 border"
                      />
                      <div>
                        <Card.Title className="mb-0 fw-bold">John Doe {item}</Card.Title>
                        <p className="text-muted mb-0">
                          {item === 1 ? "Sports Videographer" : item === 2 ? "Event Specialist" : "Wedding Filmmaker"}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="text-warning me-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="me-1" />
                        ))}
                      </span>
                      <span className="text-muted">(24 reviews)</span>
                    </div>
                    <Card.Text>
                      {item === 1
                        ? "Specialized in capturing dynamic sports moments with cinematic quality and precision."
                        : item === 2
                        ? "Expert in documenting corporate events, conferences, and live performances."
                        : "Award-winning wedding videographer creating timeless memories for couples."}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-primary">$100/hr</span>
                      <Link to={`/videographer/${item}`}>
                        <Button variant="primary" className="rounded-pill px-4">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Link to="/videographers">
              <Button variant="outline-primary" size="lg" className="rounded-pill px-5">
                View All Videographers <FaArrowRight className="ms-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <Image
              src="https://images.unsplash.com/photo-1605433663199-f1d729ef6526?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Join as Videographer"
              className="img-fluid rounded-3 shadow-lg"
            />
          </Col>
          <Col lg={6}>
            <h2 className="display-5 fw-bold mb-4">Are You a Sports or Events Videographer?</h2>
            <p className="lead mb-4">
              Join our platform to showcase your sports, events, and wedding videography work. Connect with clients looking for your specific expertise and grow your business. Set your own rates and availability.
            </p>
            <ul className="list-unstyled mb-4">
              <li className="mb-3 d-flex align-items-center">
                <span className="bg-primary text-white rounded-circle p-2 me-3"><FaCheck /></span>
                <span>Create a professional profile to showcase your sports and events videography</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <span className="bg-primary text-white rounded-circle p-2 me-3"><FaCheck /></span>
                <span>Set your own rates and availability</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <span className="bg-primary text-white rounded-circle p-2 me-3"><FaCheck /></span>
                <span>Receive booking requests directly from clients</span>
              </li>
            </ul>
            <Link to="/register">
              <Button variant="primary" size="lg" className="rounded-pill px-5">
                Join as Videographer
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
