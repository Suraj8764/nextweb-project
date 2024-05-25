import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [credentials, setCredentials] = useState({ Email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!credentials.Email) errors.Email = 'Email is required';
    if (!credentials.password) errors.password = 'Password is required';
    if (!credentials.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
    if (credentials.password !== credentials.confirmPassword) errors.confirmPassword = 'Passwords must match';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

  
    localStorage.setItem('userCredentials', JSON.stringify(credentials));
    toast.success('Signup successful!');


    setCredentials({ Email: '', password: '', confirmPassword: '' });
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Signup</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="Email"
                    value={credentials.Email}
                    onChange={handleChange}
                    isInvalid={!!errors.Email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mt-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={credentials.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-4" style={{ borderRadius: "34rem" }}>
                  Signup
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/login">Already have an account? Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
