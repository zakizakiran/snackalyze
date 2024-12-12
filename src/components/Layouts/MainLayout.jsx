import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="container font-poppins mx-auto max-w-screen-2xl min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="px-4 pt-28 pb-16 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
