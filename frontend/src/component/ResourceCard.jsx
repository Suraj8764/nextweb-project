import React from 'react';
import './ResourceCard.css'
import { Link } from 'react-router-dom';
const ResourceCard = ({ resource,onDelete }) => {
  
  return (
    <div className="resource-card">
        <div className="resource-card-border">
      <img src={resource.icon_url} alt={resource.title} className="resource-image" />

      <div className="resource-content">
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
          <p style={{fontSize:"1.5rem",fontStyle:"italic",fontWeight:"bold"}}>{resource.category}</p>
          <p style={{fontSize:"1.5rem",fontStyle:"italic",fontWeight:"bold"}}>{resource.Category}</p>
      <Link style={{fontStyle:"italic",fontFamily:"revert"}} to={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</Link>
          
      <Link style={{fontStyle:"italic",fontFamily:"revert"}} to={resource.link} target="_blank" rel="noopener noreferrer">{resource.Link}</Link>
      <button style={{position:"relative",left:"64px",fontSize:"12px",color:"black",backgroundColor:"whitesmoke"}} className="delete-btn" onClick={() => onDelete(resource)}>
        <i className="fa fa-trash"></i>
      </button>
      </div>
   
    </div>
    </div>
  );
};

export default ResourceCard;


