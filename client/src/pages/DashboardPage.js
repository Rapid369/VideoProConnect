import React, { useState, useEffect } from 'react';
import { Row, Col, Tab, Nav, Card, Button, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';

const DashboardPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock data for now - will be replaced with API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockUserInfo = {
        _id: 'u1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        role: 'client', // or 'videographer'
        profileImage: 'https://via.placeholder.com/150'
      };
      
      const mockBookings = [
        {
          _id: 'b1',
          eventType: 'Wedding',
          startTime: '2023-05-15T14:00:00.000Z',
          endTime: '2023-05-15T20:00:00.000Z',
          location: {
            address: '123 Main St, New York, NY 10001'
          },
          status: 'confirmed',
          price: 600,
          client: {
            _id: 'c1',
            name: 'Sarah Johnson',
            profileImage: 'https://via.placeholder.com/50'
          },
          videographer: {
            _id: 'v1',
            name: 'Mike Smith',
            profileImage: 'https://via.placeholder.com/50'
          }
        },
        {
          _id: 'b2',
          eventType: 'Corporate',
          startTime: '2023-06-10T09:00:00.000Z',
          endTime: '2023-06-10T17:00:00.000Z',
          location: {
            address: '456 Business Ave, New York, NY 10002'
          },
          status: 'pending',
          price: 800,
          client: {
            _id: 'c1',
            name: 'Sarah Johnson',
            profileImage: 'https://via.placeholder.com/50'
          },
          videographer: {
            _id: 'v2',
            name: 'Jane Wilson',
            profileImage: 'https://via.placeholder.com/50'
          }
        }
      ];
      
      setUserInfo(mockUserInfo);
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    let variant;
    switch (status) {
      case 'pending':
        variant = 'warning';
        break;
      case 'confirmed':
        variant = 'success';
        break;
      case 'completed':
        variant = 'primary';
        break;
      case 'cancelled':
        variant = 'danger';
        break;
      default:
        variant = 'secondary';
    }
    return <Badge bg={variant}>{status}</Badge>;
  };

  return (
    <>
      <h1>Dashboard</h1>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Tab.Container id="dashboard-tabs" defaultActiveKey="bookings">
          <Row>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body className="text-center">
                  <img
                    src={userInfo.profileImage}
                    alt={userInfo.name}
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <h4>{userInfo.name}</h4>
                  <p className="text-muted">
                    {userInfo.role === 'client' ? 'Client' : 'Videographer'}
                  </p>
                </Card.Body>
              </Card>
              
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="bookings">Bookings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="profile">Profile</Nav.Link>
                </Nav.Item>
                {userInfo.role === 'videographer' && (
                  <Nav.Item>
                    <Nav.Link eventKey="portfolio">Portfolio</Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <Nav.Link eventKey="settings">Settings</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            
            <Col md={9}>
              <Tab.Content>
                <Tab.Pane eventKey="bookings">
                  <Card>
                    <Card.Header>
                      <h3>My Bookings</h3>
                    </Card.Header>
                    <Card.Body>
                      {bookings.length === 0 ? (
                        <Message>No bookings found</Message>
                      ) : (
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Date</th>
                              <th>Event</th>
                              <th>{userInfo.role === 'client' ? 'Videographer' : 'Client'}</th>
                              <th>Price</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.map((booking) => (
                              <tr key={booking._id}>
                                <td>{booking._id}</td>
                                <td>
                                  {new Date(booking.startTime).toLocaleDateString()}
                                </td>
                                <td>{booking.eventType}</td>
                                <td>
                                  {userInfo.role === 'client'
                                    ? booking.videographer.name
                                    : booking.client.name}
                                </td>
                                <td>${booking.price}</td>
                                <td>{getStatusBadge(booking.status)}</td>
                                <td>
                                  <Link to={`/booking/${booking._id}`}>
                                    <Button variant="info" size="sm">
                                      View
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                
                <Tab.Pane eventKey="profile">
                  <Card>
                    <Card.Header>
                      <h3>My Profile</h3>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <p>
                            <strong>Name:</strong> {userInfo.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {userInfo.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {userInfo.phone}
                          </p>
                          <p>
                            <strong>Role:</strong>{' '}
                            {userInfo.role === 'client' ? 'Client' : 'Videographer'}
                          </p>
                        </Col>
                      </Row>
                      <Button variant="primary">Edit Profile</Button>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                
                {userInfo.role === 'videographer' && (
                  <Tab.Pane eventKey="portfolio">
                    <Card>
                      <Card.Header>
                        <h3>My Portfolio</h3>
                      </Card.Header>
                      <Card.Body>
                        <p>Portfolio management will be implemented here.</p>
                        <Button variant="primary">Add Portfolio Item</Button>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                )}
                
                <Tab.Pane eventKey="settings">
                  <Card>
                    <Card.Header>
                      <h3>Account Settings</h3>
                    </Card.Header>
                    <Card.Body>
                      <h5>Change Password</h5>
                      <p>Password change functionality will be implemented here.</p>
                      <h5>Notification Preferences</h5>
                      <p>Notification settings will be implemented here.</p>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </>
  );
};

export default DashboardPage;
