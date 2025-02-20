import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/userSlice';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { userInfo, loading, error } = useSelector((state) => state.user);



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then(() => {
                if (email === 'admin@admin.com') {
                    navigate('/products'); // Redirect to products if admin
                } else {
                    navigate('/'); // Redirect to home for other users
                }
            })
            .catch(() => {}); // Handle error gracefully
    };
    

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center">Login</h2>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {userInfo && <Alert variant="success">Login successful!</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4 w-100" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>

                    <div className="mt-3 text-center">
                        <p>Don't have an account? <Link to="/register">Register here</Link></p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}