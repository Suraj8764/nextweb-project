import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
  const Navigate=useNavigate()
  const [credentials, setCredentials] = useState({ Email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!credentials.Email) errors.Email = 'Email is required';
    if (!credentials.password) errors.password = 'Password is required';
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

    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials'));
    if (
      storedCredentials &&
      storedCredentials.Email === credentials.Email &&
      storedCredentials.password === credentials.password
    ) {
      toast.success('Login successful!');
      Navigate("/")
      
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
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

                <Button variant="primary" type="submit" className="w-100 mt-4" style={{ borderRadius: '34rem' }}>
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="text-center mt-2">
                <Link to="/register">Create an Account</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
