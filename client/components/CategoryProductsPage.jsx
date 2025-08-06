import React from 'react';
import { useLocation } from 'react-router-dom';
import ShowCards from '../components/ShowCards';

const CategoryProductsPage = () => {
    const location = useLocation();
    const { category, products } = location.state || {};

    return (
        <div className="p-4 md:p-10 bg-gray-100">
            <ShowCards customCategory={category} customProducts={products} />
        </div>
    );
};

export default CategoryProductsPage;
