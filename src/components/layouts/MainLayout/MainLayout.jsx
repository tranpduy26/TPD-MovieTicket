import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer/Footer";

export default function MainLayout() {
  return (
    <div>
      <Header />

      <Outlet />
      
    </div>
  );
}
