import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddResources = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await axios.post('https://media-content.ccbp.in/website/react-assignment/add_resource.json', resource);
      toast.success('Resource added successfully');
    } catch (error) {
      toast.error('Failed to add resource');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="header-title" style={{width:"100px",margin:"auto"}}>Resource</h1>
        <form className="add-resource-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Item Title:</label>
          <input type="text" id="title" name="title" value={resource.title} onChange={handleChange} />
          {errors.title && <p className="error-message">{errors.title}</p>}

          <label htmlFor="Link">Link:</label>
          <input type="text" id="Link" name="Link" value={resource.Link} onChange={handleChange} />
          {errors.Link && <p className="error-message">{errors.Link}</p>}

          <label htmlFor="icon_url">Image URL:</label>
          <input type="text" id="icon_url" name="icon_url" value={resource.icon_url} onChange={handleChange} />
          {errors.icon_url && <p className="error-message">{errors.icon_url}</p>}

          <label htmlFor="Tag">Tag Name:</label>
          <input type="text" id="Tag" name="Tag" value={resource.Tag} onChange={handleChange} />
          {errors.Tag && <p className="error-message">{errors.Tag}</p>}

          <label htmlFor="Category">Category:</label>
          <input type="text" id="Category" name="Category" value={resource.Category} onChange={handleChange} />
          {errors.Category && <p className="error-message">{errors.Category}</p>}

          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={resource.description} onChange={handleChange}></textarea>
          {errors.description && <p className="error-message">{errors.description}</p>}

          <button type="submit" className="submit-button">Create</button>
        </form>
        {/* <div className="image-container">
        <img src="https://media.istockphoto.com/id/1195775373/photo/team-of-professional-it-developers-have-a-meeting-speaker-shows-growth-data-with-graphs.jpg?s=1024x1024&w=is&k=20&c=BYdh0cbFv0_rz2NcIKpIixLsGmYSdBx5EuUCDMTIf7U=" alt="Resource Management" />
      </div> */}
      </div>
      
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default AddResources;
