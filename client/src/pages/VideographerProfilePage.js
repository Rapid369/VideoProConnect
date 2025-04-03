import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';

const VideographerProfilePage = () => {
  const { id } = useParams();
  const [videographer, setVideographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  
  // Mock data for now - will be replaced with API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = {
        _id: id,
        user: {
          name: 'John Doe',
          email: 'john@example.com',
          profileImage: 'https://via.placeholder.com/300'
        },
        bio: 'Professional videographer with over 10 years of experience specializing in weddings and corporate events. I bring a cinematic approach to every project and ensure high-quality deliverables.',
        specializations: ['Wedding', 'Corporate'],
        equipment: [
          'Sony A7S III',
          'DJI Ronin Gimbal',
          'Professional Audio Equipment',
          'Drone - DJI Mavic Pro 2'
        ],
        hourlyRate: 100,
        location: {
          city: 'New York',
          state: 'NY',
          formattedAddress: '123 Main St, New York, NY 10001'
        },
        portfolio: [
          {
            _id: 'p1',
            title: 'Corporate Event Highlight',
            description: 'Annual tech conference highlight reel',
            mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnailUrl: 'https://via.placeholder.com/300x200'
          },
          {
            _id: 'p2',
            title: 'Wedding Highlight',
            description: 'Beautiful summer wedding',
            mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnailUrl: 'https://via.placeholder.com/300x200'
          }
        ],
        rating: 4.8,
        reviewCount: 24,
        reviews: [
          {
            _id: 'r1',
            reviewer: {
              name: 'Sarah Johnson',
              profileImage: 'https://via.placeholder.com/50'
            },
            rating: 5,
            comment: 'John was amazing! He captured our wedding beautifully and was very professional.',
            createdAt: '2023-01-15T00:00:00.000Z'
          },
          {
            _id: 'r2',
            reviewer: {
              name: 'Michael Brown',
              profileImage: 'https://via.placeholder.com/50'
            },
            rating: 4,
            comment: 'Great work on our corporate event. The video quality was excellent.',
            createdAt: '2023-02-20T00:00:00.000Z'
          }
        ]
      };
      
      setVideographer(mockData);
      setLoading(false);
    }, 1000);
  }, [id]);

  const bookingHandler = (e) => {
    e.preventDefault();
    console.log('Book for date:', selectedDate);
    // Will be implemented with API calls
  };

  return (
    <>
      <Link to="/videographers" className="btn btn-light my-3">
        Go Back
      </Link>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Img
                  variant="top"
                  src={videographer.user.profileImage}
                  alt={videographer.user.name}
                />
                <Card.Body>
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
                  <div className="mb-3">
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

              <Card className="mb-4">
                <Card.Header>Book This Videographer</Card.Header>
                <Card.Body>
                  <Form onSubmit={bookingHandler}>
                    <Form.Group controlId="bookingDate" className="mb-3">
                      <Form.Label>Select Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100">
                      Check Availability
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={8}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>About</Card.Title>
                  <Card.Text>{videographer.bio}</Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Equipment</Card.Title>
                  <ListGroup variant="flush">
                    {videographer.equipment.map((item, index) => (
                      <ListGroup.Item key={index}>{item}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Portfolio</Card.Title>
                  <Row>
                    {videographer.portfolio.map((item) => (
                      <Col key={item._id} md={6} className="mb-3">
                        <Card>
                          <Card.Img
                            variant="top"
                            src={item.thumbnailUrl}
                            alt={item.title}
                          />
                          <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <a
                              href={item.mediaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              Watch Video
                            </a>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title>Reviews</Card.Title>
                  {videographer.reviews.length === 0 ? (
                    <Message>No reviews yet</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {videographer.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <Row>
                            <Col md={2}>
                              <img
                                src={review.reviewer.profileImage}
                                alt={review.reviewer.name}
                                className="img-fluid rounded-circle"
                              />
                              <p className="mt-2">{review.reviewer.name}</p>
                            </Col>
                            <Col md={10}>
                              <div className="mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`fas fa-star ${
                                      i < review.rating ? 'text-warning' : 'text-muted'
                                    }`}
                                  ></i>
                                ))}
                                <span className="ms-2">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p>{review.comment}</p>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default VideographerProfilePage;
