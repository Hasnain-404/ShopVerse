import React from 'react';
import womenPic from "../img/women.png";
import bagPic from "../img/bag.png";
import handbagPic from "../img/handbag.png";
import watchPic from "../img/watch.png";
import PriceOff from './PriceOff';

const DisplayCards = () => {
    return (
        <>
            <div className='px-4 md:px-10 py-5 flex flex-col md:flex-row gap-5'>

                {/* Left Card - Women's Style */}
                <div className='bg-blue-100 w-full md:w-[50%] h-[60vh] md:h-[50vh] rounded shadow-md shadow-gray-300 overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 md:px-11 relative'>
                    <div className='mt-4 md:mt-16'>
                        <img src={womenPic} alt="" className='w-[180px] md:w-auto' />
                    </div>

                    <div className='text-center md:text-end'>
                        <div className='text-blue-700 font-medium capitalize text-xl'>
                            new arrivals
                        </div>
                        <div className='text-3xl capitalize font-bold py-3'>
                            women's style
                        </div>
                        <div className='text-xl capitalize'>
                            up to 70% off
                        </div>
                        <button
                            className='border-2 py-2 px-4 rounded-3xl text-xl font-medium capitalize mt-4 md:absolute md:right-[30px]'
                            type='submit'
                        >
                            Shop now
                        </button>
                    </div>
                </div>

                {/* Right Cards */}
                <div className='w-full md:w-[50%] flex flex-col gap-3'>

                    {/* Top Two Cards */}
                    <div className='flex flex-col sm:flex-row gap-3'>

                        {/* Handbag */}
                        <div className='bg-[#1A1A1D] text-white w-full sm:w-1/2 h-[24vh] px-4 py-6 rounded flex items-center justify-between overflow-hidden'>
                            <div>
                                <PriceOff discount="28" />
                                <span className='text-2xl font-bold capitalize'>handbag</span>
                                <div className='text-white text-sm capitalize font-medium cursor-pointer'>
                                    <button type="submit">shop now</button>
                                    <i className="ri-arrow-right-s-line"></i>
                                </div>
                            </div>
                            <img className='w-20' src={bagPic} alt="" />
                        </div>

                        {/* Watch */}
                        <div className='bg-[#181C14] text-white w-full sm:w-1/2 h-[24vh] px-4 py-6 rounded flex items-center justify-between overflow-hidden'>
                            <div>
                                <PriceOff discount="70" />
                                <span className='text-2xl font-bold capitalize'>watch</span>
                                <div className='text-white text-sm capitalize font-medium cursor-pointer'>
                                    <button type="submit">shop now</button>
                                    <i className="ri-arrow-right-s-line"></i>
                                </div>
                            </div>
                            <img className='w-20 ml-2' src={watchPic} alt="" />
                        </div>
                    </div>

                    {/* Backpack */}
                    <div className='bg-[#44311b] h-[25vh] px-4 py-4 rounded flex justify-between items-center text-white overflow-hidden'>
                        <div className='capitalize'>
                            <div className='text-lg font-medium'>accessories</div>
                            <div className='text-3xl font-bold py-0.5'>backpack</div>
                            <div className='font-medium text-base'>min. 40-80% off</div>
                            <div className='text-[16px] capitalize font-medium cursor-pointer'>
                                <button type="submit">shop now</button>
                                <i className="ri-arrow-right-s-line"></i>
                            </div>
                        </div>
                        <img className='w-[100px] sm:w-[130px] md:w-[15vw]' src={handbagPic} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DisplayCards;
