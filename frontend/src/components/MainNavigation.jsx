import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainNavigation() {
  return (
    <div className="main-content">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
