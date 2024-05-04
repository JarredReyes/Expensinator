import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from './contexts/CategoryContext';
import './css/Category.css';

const Category = ({ expanded }) => {
    const { categories, addCategory, removeCategory } = useCategories();
    const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [menuVisible, setMenuVisible] = useState(null);

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) {
            alert("Category name is required");
            return;
        }
        addCategory(newCategoryName);
        setShowAddCategoryPopup(false);
        setNewCategoryName('');
    };

    const handleDeleteCategory = (name) => {
        removeCategory(name);
    };

    const toggleMenu = (index) => {
        setMenuVisible(menuVisible === index ? null : index);
    };

    return (
        <>
            <div className={`category-content ${expanded ? 'expanded' : 'collapsed'}`}>
                <h2>Categories</h2>
                <div className='category-header'>
                    <p>Manage your spending efficiently with our Expense Tracker App's categories</p>
                    <button onClick={() => setShowAddCategoryPopup(true)}>Add Category</button>
                </div>
                <hr />
                <div className="category-grid">
                    {categories.map((category, index) => (
                        <div className="category-card" key={category.name}>
                            <div className="category-color-box" style={{ backgroundColor: category.color || '#2196F3' }}>
                                <div className="category-dots" onClick={(e) => { e.stopPropagation(); toggleMenu(index); }}>
                                    <span className="dots">...</span>
                                    {menuVisible === index && (
                                        <div className="category-menu">
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.name); }}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="category-details">
                                <h3>{category.name}</h3>
                                <div className="category-options">
                                    <Link to={`/category/${category.name}`} style={{ textDecoration: 'none' }}>
                                        <button onClick={(e) => { e.stopPropagation()}}>View</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showAddCategoryPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <div className='popup-header'>
                                <h3>Add a New Category</h3>
                                <span className="close" onClick={() => setShowAddCategoryPopup(false)}>&times;</span>
                            </div>
                            <hr />
                            <p>Add a category to better track and manage your expenses.</p>
                            <input
                                type="text"
                                placeholder="Enter Category Name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                required
                            />
                            <center><button onClick={handleAddCategory}>Add Category</button></center>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Category;
