import React from "react";
import NavBar from "./components/navBar";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer";
import Login from "./components/Login";
import { useAppContext } from "./context/AppContext";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/productCategory";
import ProductDetails from "./pages/productDetails";
import Cart from "./pages/Cart";
import SellerLayOut from "./pages/seller/sellerLayout";
import AddAddress from "./pages/addAddress";
import MyOrders from "./pages/myOrders";
import SellerLogin from "./components/seller/sellerLogin";
import AddProducts from "./pages/seller/AddProducts";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <>
      <div className="text-default min-h-screen text-gray-700 bg-white">
        {isSellerPath ? null : <NavBar />}
        {showUserLogin ? <Login /> : null}
        <Toaster />
        <div
          className={`${
            isSellerPath ? "" : "px-16 md:px-16 lg:px-24 xl:px-32"
          }`}
        >
          {/* CHANGING COMPONENTS */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addAddress" element={<AddAddress />} />
            <Route
              path="/products/:category/:id"
              element={<ProductDetails />}
            />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route
              path="/seller"
              element={isSeller ? <SellerLayOut /> : <SellerLogin />}
            >
              <Route
                index
                path=""
                element={isSeller ? <AddProducts /> : null}
              />
              <Route index path="product-list" element={<ProductList />} />
              <Route index path="orders" element={<Orders />} />
              {/* <Route index path="product-list" element={<ProductList/>}/> */}
            </Route>
          </Routes>
        </div>
        {isSellerPath ? null : <Footer />}
      </div>
    </>
  );
}

export default App;
