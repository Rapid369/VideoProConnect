import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';

const VideographerListPage = () => {
  const [videographers, setVideographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');
  
  // Mock data for now - will be replaced with API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          _id: '1',
          user: {
            name: 'John Doe',
            profileImage: 'https://via.placeholder.com/150'
          },
          specializations: ['Wedding', 'Corporate'],
          hourlyRate: 100,
          location: {
            city: 'New York',
            state: 'NY'
          },
          rating: 4.8,
          reviewCount: 24
        },
        {
          _id: '2',
          user: {
            name: 'Jane Smith',
            profileImage: 'https://via.placeholder.com/150'
          },
          specializations: ['Music Video', 'Documentary'],
          hourlyRate: 85,
          location: {
            city: 'Los Angeles',
            state: 'CA'
          },
          rating: 4.5,
          reviewCount: 18
        },
        {
          _id: '3',
          user: {
            name: 'Mike Johnson',
            profileImage: 'https://via.placeholder.com/150'
          },
          specializations: ['Event', 'Commercial'],
          hourlyRate: 120,
          location: {
            city: 'Chicago',
            state: 'IL'
          },
          rating: 4.9,
          reviewCount: 32
        }
      ];
      
      setVideographers(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Search for:', searchTerm, specialization);
    // Will be implemented with API calls
  };

  const specializations = [
    'Wedding',
    'Corporate',
    'Music Video',
    'Documentary',
    'Commercial',
    'Event',
    'Real Estate',
    'Drone',
    'Sports',
    'Fashion'
  ];

  return (
    <>
      <h1>Find Videographers</h1>
      <Form onSubmit={submitHandler} className="mb-4">
        <Row>
          <Col md={5}>
            <Form.Group controlId="searchTerm">
              <Form.Control
                type="text"
                placeholder="Search by name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group controlId="specialization">
              <Form.Select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button type="submit" variant="primary" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {videographers.map((videographer) => (
            <Col key={videographer._id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={4}>
                      <img
                        src={videographer.user.profileImage}
                        alt={videographer.user.name}
                        className="img-fluid rounded-circle"
                      />
                    </Col>
                    <Col xs={8}>
                      <Card.Title>{videographer.user.name}</Card.Title>
                      <Card.Text>
                        <i className="fas fa-map-marker-alt"></i>{' '}
                        {videographer.location.city}, {videographer.location.state}
                        <br />
                        <i className="fas fa-tag"></i> ${videographer.hourlyRate}/hr
                        <br />
                        <i className="fas fa-star text-warning"></i>{' '}
                        {videographer.rating} ({videographer.reviewCount} reviews)
                      </Card.Text>
                      <div className="mb-2">
                        {videographer.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="badge bg-secondary me-1"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      <Link to={`/videographer/${videographer._id}`}>
                        <Button variant="outline-primary" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default VideographerListPage;
