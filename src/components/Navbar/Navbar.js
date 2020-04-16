//library imports
import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";

//stylesheets
import "./Navbar.css";
function Navbar({ propHeight }) {
  //springs
  const [{ height, backgroundColor }, setHeight] = useSpring(() => ({
    height: propHeight,
    backgroundColor: "#0c0a0a",
  }));
  const [{ opacity }, setOpacity] = useSpring(() => ({
    opacity: 0,
  }));

  //useEffects
  useEffect(() => {
    if (propHeight === 80) {
      setHeight({ height: propHeight, backgroundColor: "black" });
      setOpacity({ opacity: 1 });
    }
  }, [propHeight, setHeight, setOpacity]);

  //return component
  return (
    <React.Fragment>
      <animated.div
        className="navbar"
        style={{
          height: height.interpolate((h) => h),
          backgroundColor,
        }}
      >
        <animated.div className="logo" style={{ opacity }}>
          <h2>Xtreme</h2>
          <h3>Skate Board</h3>
        </animated.div>
        <animated.div className="option-holder" style={{ opacity }}>
          <div>Skate</div>
          <div>Snow Board</div>
          <div>Shoes</div>
          <div>Clothing</div>
        </animated.div>
        <animated.div className="account-holder" style={{ opacity }}>
          <div>Cart</div>
          <div>Sign in</div>
        </animated.div>
      </animated.div>
    </React.Fragment>
  );
}

export default Navbar;
