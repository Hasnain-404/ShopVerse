import React from 'react';

const CategoryCard = ({ img, title, description, onClick }) => {
    return (
        <div
            onClick={onClick}
            className='min-w-[180px] max-w-[200px] bg-white rounded-lg shadow-md p-4 text-center flex-shrink-0 cursor-pointer hover:scale-[1.03] transition-transform duration-300'
        >
            <img className='h-28 w-full object-contain mx-auto mb-2' src={img} alt={title} />
            <div className='text-lg font-semibold capitalize'>{title}</div>
            <div className='text-sm text-gray-600'>{description}</div>
        </div>
    );
};

export default CategoryCard;
