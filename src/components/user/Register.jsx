import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/registerSlice';
import React from 'react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.registerSlice);

    const validateForm = () => {
        const newErrors = {};
        const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegx = /^[A-Za-z\s]+$/;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required!';
        } else if (!nameRegx.test(formData.name)) {
            newErrors.name = 'Name must contain only letters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required!';
        } else if (!emailRegx.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required!';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        dispatch(registerUser(userData))
            .unwrap()
            .then(() => {
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
            })
            .catch(error => {
                setErrors({ api: error });
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="w-100" style={{ maxWidth: '500px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Create Account</h2>

                    {success && <Alert variant="success">Registration successful! You are a user now.</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </Button>

                        <div className="text-center">
                            Already have an account? <Link to="/login">Log In</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}