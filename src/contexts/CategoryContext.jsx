import React, { createContext, useContext, useEffect, useState } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState(() => {
        const storedCategories = localStorage.getItem('categories');
        return storedCategories ? JSON.parse(storedCategories) : [];
    });

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const addCategory = (categoryName) => {
        const newCategory = { name: categoryName };
        setCategories(prevCategories => [...prevCategories, newCategory]);
    };

    const removeCategory = (categoryName) => {
        setCategories(prevCategories => prevCategories.filter(category => category.name !== categoryName));
    };

    return (
        <CategoryContext.Provider value={{ categories, addCategory, removeCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => useContext(CategoryContext);
