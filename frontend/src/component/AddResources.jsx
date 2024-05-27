import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  icon_url: yup.string().url('Invalid URL format').required('Image URL is required'),
  Link: yup.string().url('Invalid URL format').required('Link is required'),
  Tag: yup.string().required('Tag is required'),
  Category: yup.string().required('Category is required'),
});

const AddResources = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let resources = JSON.parse(localStorage.getItem('resources')) || [];
    resources.push(data);
    localStorage.setItem('resources', JSON.stringify(resources));

    toast.success('Resource added successfully!');
    navigate("/home");
    reset();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Add New Resource</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="title" className="mb-2">
                  <Form.Label>Item Title</Form.Label>
                  <Form.Control style={{position:"relative",right:"1.5rem"}} className="text-start"
                    type="text"
                    {...register('title')}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="Link" className="mb-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control style={{position:"relative",right:"1.5rem"}}
                    type="text"
                    {...register('Link')}
                    isInvalid={!!errors.Link}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Link?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="icon_url" className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                  style={{position:"relative",right:"1.5rem"}}
                    type="text"
                    {...register('icon_url')}
                    isInvalid={!!errors.icon_url}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.icon_url?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="Tag" className="mb-3 ">
                  <Form.Label>Tag Name</Form.Label>
                  <Form.Control
                  style={{position:"relative",right:"1.5rem"}}
                    type="text"
                    {...register('Tag')}
                    isInvalid={!!errors.Tag}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Tag?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="Category" className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                  style={{position:"relative",right:"1.5rem"}}
                    type="text"
                    {...register('Category')}
                    isInvalid={!!errors.Category}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Category?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                  style={{position:"relative",right:"0.5rem"}}
                    as="textarea"
                    {...register('description')}
                    isInvalid={!!errors.description}
                    rows={4}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer position="bottom-center" />
    </Container>
  );
};

export default AddResources;
