import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaCar, FaBolt, FaFilm, FaEllipsisH } from 'react-icons/fa';
import './css/Category.css';

const Category = ({ expenses, expanded }) => {
    const [selectedCategory, setSelectedCategory] = useState('Food');

    const categories = [
        { name: 'Food', icon: FaUtensils, image: 'public/category2.png' },
        { name: 'Transport', icon: FaCar, image: 'public/category4.png' },
        { name: 'Utilities', icon: FaBolt, image: 'public/category3.png' },
        { name: 'Entertainment', icon: FaFilm, image: 'public/category1.png' },
        { name: 'Other', icon: FaEllipsisH, image: 'src/assets/categories.jpg' }
    ];

    return (
        <div className={`category-page ${expanded ? 'expanded' : 'collapsed'}`}>
            <h1>Categories</h1>
            <hr />
            <div className="category-grid">
                {categories.map((category, index) => (
                    <Link key={category.name} to={`/category-expenses/${category.name}`} className="category-card">
                        <div className="category-color-box" style={{ backgroundImage: `url(${category.image})` }}>
                            <category.icon size={50} />
                        </div>
                        <div className="category-details">
                            <p>{expenses.filter(expense => expense.category === category.name).length} Expenses</p>
                            <h3>{category.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Category;


