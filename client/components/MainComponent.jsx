import React from 'react'
import Crousel from './Crousel'
import Services from './Services'
import DisplayCards from './DisplayCards'
import NewArrival from './NewArrival'
import BestSelling from './BestSelling'
import TopRated from './TopRated'
import FeatureCard from './FeatureCard'
import FeaturedCategoies from './FeaturedCategoies'
import ShowCards from './ShowCards'
import ProductDetails from './ProductDetails'
import CartPage from './CartPage'
import BecomeSellerForm from './Seller/BecomeSellerForm'
import SellerDashboard from './Seller/SellerDashboard'

const MainComponent = () => {
    return (
        <>
            <div>
                <Crousel />
                <Services />
                <DisplayCards />
                <NewArrival />
                <BestSelling />
                <TopRated />
                <FeatureCard />
                <FeaturedCategoies />
            </div>
        </>
    )
}

export default MainComponent