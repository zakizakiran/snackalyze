import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="container mx-auto max-w-screen-2xl min-h-screen">
      <Navbar />
      <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
