import React from 'react';

const Services = () => {
    return (
        <>
            <div className='hidden md:flex justify-evenly items-center px-10 py-6 bg-white'>
                <div className='flex items-center uppercase font-medium'>
                    <i className="ri-truck-line text-3xl p-2 text-blue-400"></i>
                    <span className='text-xl'>free shipping</span>
                </div>
                <div className='flex items-center uppercase font-medium'>
                    <i className="ri-shake-hands-line text-3xl p-2 text-blue-400"></i>
                    <span className='text-xl'>secure payment</span>
                </div>
                <div className='flex items-center uppercase font-medium'>
                    <i className="ri-hand-coin-line text-3xl p-2 text-blue-400"></i>
                    <span className='text-xl'>100% money back</span>
                </div>
                <div className='flex items-center uppercase font-medium'>
                    <i className="ri-chat-1-line text-3xl p-2 text-blue-400"></i>
                    <span className='text-xl'>online support</span>
                </div>
            </div>
        </>
    );
};

export default Services;
