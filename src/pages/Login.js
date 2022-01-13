import React from 'react';
import { Container, Card, Button, Form } from "react-bootstrap";


const Login = () => {
    return (
        // TODO: Make Login Page
        <Container>
            <div className="d-flex justify-content-center mt-5">
                <Card className="text-center center-block cardForm">
                    <Card.Header className="cardHeader">Login</Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="user@email.com" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="hard to guess password" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Remember me"></Form.Check>
                        </Form.Group>
                        <Button type="submit" className="submitBtn">Log In</Button>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default Login;
