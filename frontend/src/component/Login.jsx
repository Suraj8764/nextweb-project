import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import AuthContext from './AuthContext';

const schema = yup.object().shape({
  Email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials'));
    if (
      storedCredentials &&
      storedCredentials.Email === data.Email &&
      storedCredentials.password === data.password
    ) {
      const user = { Email: storedCredentials.Email, isAuthenticated: true };
      localStorage.setItem('user', JSON.stringify(user));
      login(user);
      toast.success('Login successful!');
      navigate("/home");
    } else {
      toast.error('Invalid email or password');
    }
    reset();
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  style={{position:"relative",right:"1.5rem"}}
                    type="text"
                    {...register('Email')}
                    isInvalid={!!errors.Email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                   style={{position:"relative",right:"1.5rem"}}
                    type="password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
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
