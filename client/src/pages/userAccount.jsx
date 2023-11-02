import React, { useContext } from 'react';
import { AuthContext } from '../Auth.jsx';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function UserAccount() {
    const { isLoggedIn, currentUser } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }
    const greeting = currentUser && currentUser.id 
        ? `Hello User ${currentUser.id}` 
        : 'Hello Guest';
    return (
        <Container>
            <div className="background-image"></div>
            <Row className="welcome-header justify-content-center align-items-center">
                <Col className="text-center">
                <h2>{greeting}</h2>
                    <p>Welcome to your Root Routine</p>
                </Col>
            </Row>

            <Row>
    <Col>
        <Card className="outer-weather-card">
            <Card.Body>
                <Card.Title>Weather Information</Card.Title>
                <div className="weather-card-container">
                    {["Mon", "Tues", "Wed", "Thurs", "Fri", "Satur", "Sun"].map(day => (
                        <Card key={day} className="day-card">
                            <Card.Body>
                                <Card.Title>{day}</Card.Title>
                                <Card.Text>
                                
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Card.Body>
        </Card>
    </Col>
</Row>

            <Row>
                <Col md={6}>
                    <Card className="plant-button-card">
                        <Card.Body>
                            <Button variant="primary" size="lg" block>
                                Add A Plant
                            </Button>
                            <Card.Title style={{ marginTop: '20px' }}>Your Plants</Card.Title>
                            <Card.Text>
                                - Plant A <br />
                                - Plant B <br />
                                (More plants will be listed here)
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="info-card">
                        <Card.Body>
                            <Card.Title>Plant Care Info</Card.Title>
                            <Card.Text>
                                Care instructions and details for your selected plant will be displayed here.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default UserAccount;
