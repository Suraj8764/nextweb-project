import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const schema = yup.object().shape({
  Email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

const Signup = () => {
  const Navigate=useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    localStorage.setItem('userAuth', JSON.stringify(data));
  const userAuth=  localStorage.setItem('userCredentials', JSON.stringify(data));
  console.log(userAuth,"userAuth");
    toast.success('Signup successful!');
    Navigate('/')
    reset();
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Signup</Card.Title>
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

                <Form.Group controlId="confirmPassword" className="mt-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                     style={{position:"relative",right:"1.5rem"}}
                    type="password"
                    {...register('confirmPassword')}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-4" style={{ borderRadius: "34rem" }}>
                  Signup
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/">Already have an account? Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
