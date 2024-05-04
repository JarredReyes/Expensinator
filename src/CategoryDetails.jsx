import React from 'react';
import { useParams } from 'react-router-dom';
import './css/Category.css'; 

const CategoryDetails = ({ expanded }) => {
    const { categoryName } = useParams(); 

    return (
        <div className={`category-content ${expanded ? 'expanded' : 'collapsed'}`}>
            <h1>Details for {categoryName}</h1>
            {}
        </div>
    );
};

export default CategoryDetails;
