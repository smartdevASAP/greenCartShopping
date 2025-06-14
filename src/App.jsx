import React from "react";
import NavBar from "./components/navBar";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <>
      <div>
        {isSellerPath ? null : <NavBar />}
        <Toaster />
        <div
          className={`${
            isSellerPath ? "" : "px-16 md:px-16 lg:px-24 xl:px-32"
          }`}
        >
          {/* CHANGING COMPONENTS */}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        {isSellerPath ? null : <Footer />}
      </div>
    </>
  );
}

export default App;
