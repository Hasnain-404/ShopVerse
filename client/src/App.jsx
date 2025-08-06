import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import BecomeSellerForm from "../components/Seller/BecomeSellerForm";
import Layout from "../components/Layout";
import SellerDashboard from "../components/Seller/SellerDashboard";
import AddProduct from "../components/Seller/AddProduct";
import MyProducts from "../components/Seller/MyProducts";
import CategoryProductsPage from "../components/CategoryProductsPage";
import ProductDetails from "../components/ProductDetails";
import CartPage from "../components/CartPage";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="user-cart" element={<CartPage />} />
        <Route path="/become-seller" element={<BecomeSellerForm />} />
        <Route path="/fetch-seller" element={<SellerDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/my-product" element={<MyProducts />} />
        <Route path="/category-products" element={<CategoryProductsPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />

      </Routes>
    </>
  );
};

export default App;
