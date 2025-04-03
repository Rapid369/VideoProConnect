import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import FormContainer from '../components/common/FormContainer';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [videographer, setVideographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Booking form state
  const [eventType, setEventType] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  
  // Mock data for now - will be replaced with API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = {
        _id: '1',
        user: {
          _id: 'u1',
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
      };
      
      setVideographer(mockData);
      setLoading(false);
    }, 1000);
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    // Create booking object
    const bookingData = {
      videographer: videographer.user._id,
      videographerProfile: videographer._id,
      eventType,
      eventDetails,
      location,
      startTime: `${startDate}T${startTime}`,
      endTime: `${endDate}T${endTime}`,
      specialRequirements
    };
    
    console.log('Booking data:', bookingData);
    // Will be implemented with API calls
    
    // Redirect to success page or dashboard
    // navigate('/dashboard');
  };

  const eventTypes = [
    'Wedding',
    'Corporate',
    'Music Video',
    'Documentary',
    'Commercial',
    'Event',
    'Real Estate',
    'Sports',
    'Fashion',
    'Other'
  ];

  return (
    <>
      <Link to={`/videographer/${id}`} className="btn btn-light my-3">
        Go Back
      </Link>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Videographer Details</Card.Title>
                <Row>
                  <Col xs={4}>
                    <img
                      src={videographer.user.profileImage}
                      alt={videographer.user.name}
                      className="img-fluid rounded-circle"
                    />
                  </Col>
                  <Col xs={8}>
                    <h5>{videographer.user.name}</h5>
                    <p>
                      <i className="fas fa-map-marker-alt"></i>{' '}
                      {videographer.location.city}, {videographer.location.state}
                      <br />
                      <i className="fas fa-tag"></i> ${videographer.hourlyRate}/hr
                      <br />
                      <i className="fas fa-star text-warning"></i>{' '}
                      {videographer.rating} ({videographer.reviewCount} reviews)
                    </p>
                  </Col>
                </Row>
                <div className="mt-3">
                  <h6>Specializations:</h6>
                  {videographer.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="badge bg-secondary me-1"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body>
                <Card.Title>Booking Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Hourly Rate:</Col>
                      <Col className="text-end">${videographer.hourlyRate}</Col>
                    </Row>
                  </ListGroup.Item>
                  {startDate && endDate && startTime && endTime && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>Duration:</Col>
                          <Col className="text-end">
                            {/* This is a simplified calculation */}
                            {Math.max(
                              1,
                              Math.ceil(
                                (new Date(`${endDate}T${endTime}`) - new Date(`${startDate}T${startTime}`)) /
                                  (1000 * 60 * 60)
                              )
                            )}{' '}
                            hours
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Estimated Total:</Col>
                          <Col className="text-end">
                            $
                            {videographer.hourlyRate *
                              Math.max(
                                1,
                                Math.ceil(
                                  (new Date(`${endDate}T${endTime}`) - new Date(`${startDate}T${startTime}`)) /
                                    (1000 * 60 * 60)
                                )
                              )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Book {videographer.user.name}</Card.Title>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="eventType" className="mb-3">
                    <Form.Label>Event Type</Form.Label>
                    <Form.Select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      required
                    >
                      <option value="">Select Event Type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="eventDetails" className="mb-3">
                    <Form.Label>Event Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Describe your event"
                      value={eventDetails}
                      onChange={(e) => setEventDetails(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="location" className="mb-3">
                    <Form.Label>Event Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter full address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="startDate" className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="startTime" className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="endDate" className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="endTime" className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="specialRequirements" className="mb-3">
                    <Form.Label>Special Requirements (Optional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Any special requests or requirements"
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100 mt-3">
                    Request Booking
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BookingPage;
