import React from 'react';
import { Container, Card, Button, Form } from "react-bootstrap";

const Signup = () => {
    return (
        // TODO: Make Signup Page
        <Container>
            <div className="d-flex justify-content-center mt-5">
                <Card className="text-center center-block cardForm">
                    <Card.Header className="cardHeader">Signup</Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="user@email.com" required></Form.Control>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="hard to guess password" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Verify Password</Form.Label>
                            <Form.Control type="password" placeholder="hard to guess password" required></Form.Control>
                        </Form.Group>
                        <Button type="submit" className="submitBtn">Sign Up</Button>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default Signup;
