import React from 'react'
import menPic from '../img/men.png';
import womenPic from '../img/women.png';

const FeatureCard = () => {
    return (
        <div className='py-8 px-4 md:px-10'>
            <div className='flex flex-col lg:flex-row gap-6'>
                {/* Men's Fashion Card */}
                <div className='bg-gray-300 w-full px-6 py-8 rounded-md overflow-hidden flex flex-col sm:flex-row justify-between items-center'>
                    <div className='mb-4 sm:mb-0'>
                        <div className='text-2xl font-medium capitalize'>weekend sale</div>
                        <div className='text-3xl md:text-4xl font-bold capitalize'>men's fashion</div>
                        <div className='font-bold capitalize text-xl mt-1'>flat <span className='text-blue-500'>70% off</span></div>
                        <div className='text-lg capitalize font-medium mt-2'>
                            <button className='flex items-center gap-1 text-blue-600 hover:underline'>
                                shop now <i className="ri-arrow-right-s-line text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <img className='w-40 md:w-56' src={menPic} alt="Men Fashion" />
                    </div>
                </div>

                {/* Women's Wear Card */}
                <div className='bg-gray-300 w-full px-6 py-8 rounded-md overflow-hidden flex flex-col sm:flex-row justify-between items-center'>
                    <div className='mb-4 sm:mb-0'>
                        <div className='text-2xl font-medium capitalize'>fashion style</div>
                        <div className='text-3xl md:text-4xl font-bold capitalize'>women's wear</div>
                        <div className='font-bold capitalize text-xl mt-1'>min. <span className='text-blue-500'>35-70% off</span></div>
                        <div className='text-lg capitalize font-medium mt-2'>
                            <button className='flex items-center gap-1 text-blue-600 hover:underline'>
                                shop now <i className="ri-arrow-right-s-line text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <img className='w-40 md:w-56' src={womenPic} alt="Women Fashion" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard
