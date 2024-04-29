import React from 'react';
import './css/Category.css';

const Category = ({ expanded }) => {
  return (
    <div className={`category-content ${expanded ? 'expanded' : 'collapsed'}`}>
      <h2>Welcome to Category Page</h2>
      <p>This is the content of the Category page.</p>
    </div>
  );
};

export default Category;