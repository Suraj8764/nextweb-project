import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AddResources = () => {
  const Navigate=useNavigate();
  const [resource, setResource] = useState({ title: '', description: '', icon_url: '', Link: '', Tag: '', Category: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!resource.title) errors.title = 'Title is required';
    if (!resource.description) errors.description = 'Description is required';
    if (!resource.Link) errors.Link = 'Link is required';
    if (!resource.icon_url) errors.icon_url = 'Image URL is required';
    if (!resource.Tag) errors.Tag = 'Tag is required';
    if (!resource.Category) errors.Category = 'Category is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
     
      let resources = JSON.parse(localStorage.getItem('resources')) || [];
      resources.push(resource);
      localStorage.setItem('resources', JSON.stringify(resources));

      toast.success('Resource added successfully!');
      Navigate("/")
      setResource({ title: '', description: '', icon_url: '', Link: '', Tag: '', Category: '' });
    } else {
      toast.error('Please fill in all the fields correctly.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Add New Resource</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Item Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={resource.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="Link" className="mt-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="Link"
                    value={resource.Link}
                    onChange={handleChange}
                    isInvalid={!!errors.Link}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Link}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="icon_url" className="mt-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="icon_url"
                    value={resource.icon_url}
                    onChange={handleChange}
                    isInvalid={!!errors.icon_url}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.icon_url}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="Tag" className="mt-3">
                  <Form.Label>Tag Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Tag"
                    value={resource.Tag}
                    onChange={handleChange}
                    isInvalid={!!errors.Tag}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Tag}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="Category" className="mt-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="Category"
                    value={resource.Category}
                    onChange={handleChange}
                    isInvalid={!!errors.Category}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Category}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="description" className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={resource.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                    rows={4}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-4">
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
