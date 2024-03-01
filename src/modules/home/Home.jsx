import React from "react";
import Banner from "./Banner";
import Showing from "./Showing";
import Cinema from "./Cinema";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Banner />
      <Showing />
      <Cinema />
      <Footer />
    </div>
  );
}
