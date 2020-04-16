//library imports
import React, { useState } from "react";

//stylesheets
import "./App.css";

//components
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/landing_page/landingPage";
import AboutPage from "./components/AboutPage/AboutPage";
import Carousel from "./components/Carousel/Carousel";
import DummyNavbar from "./components/DummyNavbar/DummyNavbar";

function App() {
  const [height, setHeight] = useState(window.innerHeight);
  const [number, setNumber] = useState(0);
  const [overflow, setOverflow] = useState("hidden");

  const changeHeight = () => {
    setOverflow("visible");
    setHeight(() => 80);
    setNumber(() => 70);
  };

  //return component
  return (
    <div className="App" style={{ overflow: overflow }}>
      <Navbar propHeight={height} />
      <DummyNavbar propHeight={height} />
      <AboutPage number={number} />
      <Carousel />
      {number === 0 && <LandingPage setHeight={changeHeight} />}
    </div>
  );
}

export default App;
