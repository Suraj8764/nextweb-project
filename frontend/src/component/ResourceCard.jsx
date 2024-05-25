import React from 'react';
import './ResourceCard.css'
import { Link } from 'react-router-dom';
const ResourceCard = ({ resource }) => {
   

  return (
    <div className="resource-card">
      <img src={resource.icon_url} alt={resource.title} className="resource-image" />

      <div className="resource-content">
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
          <p style={{fontSize:"1.5rem",fontStyle:"italic",fontWeight:"bold"}}>{resource.category}</p>
      <Link style={{fontStyle:"italic",fontFamily:"revert"}} to={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</Link>

      </div>
   
    </div>
  );
};

export default ResourceCard;


