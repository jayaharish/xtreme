//library imports
import React, { useState, useEffect } from "react";
import { useSpring, useTrail, animated, interpolate } from "react-spring";
import { FaChevronDown } from "react-icons/fa";

//stylesheets
import "./AboutPage.css";

//images
import skater from "./assets/skater.png";

function AboutPage({ number }) {
  //static lists
  const borderClasses = [
    "bottomBorder",
    "leftBorder",
    "topBorder",
    "rightBorder",
  ];
  const config = { mass: 5, tension: 2000, friction: 200 };

  //states
  const [shouldCancel, changeCancel] = useState(false);

  //landing page text
  const websiteText = ["Discover Products", "For a life-well lived"];

  //trail springs
  const [Texttrail, setTextTrail] = useTrail(websiteText.length, () => ({
    opacity: 0,
    x: 30,
    height: 0,
  }));

  //springs
  const [props, setProps] = useSpring(() => ({
    x1: 100,
    x2: 100,
    x3: 100,
    x4: 100,
    scale: 1,
  }));
  const [{ opacity }, setOpacity] = useSpring(() => ({
    opacity: 0,
  }));
  const [iconProps, setIconProps] = useSpring(() => ({
    x: 0,
    scale: 1,
  }));

  //useEffect
  useEffect(() => {
    if (number !== 0) {
      setTextTrail({
        opacity: 1,
        x: 0,
        height: number,
        delay: 1000,
        config,
      });
      setOpacity({ opacity: 1, delay: 1000 });
      setProps({
        to: async (next, cancel) => {
          await next({ x1: 0 });
          await next({ x2: 0 });
          next({ scale: 1.03 });
          await next({ x3: 0 });
          await next({ x4: 0 });
        },
      });
      setIconProps({
        to: async (next, cancel) => {
          while (1) {
            await next({ x: 30, scale: 1.02 });
            await next({ x: 30, scale: 1.2 });
            await next({ x: 20, scale: 1.02 });
            await next({ x: 30, scale: 1.2 });
            await next({ x: 25, scale: 1.02 });
            await next({ x: 30, scale: 1.2 });
            await next({ x: 0, scale: 1 });
            if (shouldCancel) break;
          }
        },
        config: {
          duration: 300,
        },
      });
    }
  }, [
    number,
    setProps,
    setIconProps,
    setOpacity,
    setTextTrail,
    shouldCancel,
    config,
  ]);

  //functions
  const getValue = (index) => {
    if (index === 0) return props.x1.interpolate((x) => `translate(${x}%,0)`);
    else if (index === 1)
      return props.x2.interpolate((x) => `translate(0,${x}%)`);
    else if (index === 2)
      return props.x3.interpolate((x) => `translate(-${x}%,0)`);
    else if (index === 3)
      return props.x4.interpolate((x) => `translate(0,-${x}%)`);
  };

  return (
    <div className="about">
      <animated.div
        className="cmpny-text-holder"
        style={{ transform: props.scale.interpolate((s) => `scale(${s})`) }}
      >
        <div className="borderClass">
          {borderClasses.map((borderclass, index) => (
            <animated.div
              key={index}
              className={borderclass}
              style={{
                transform: getValue(index),
              }}
            ></animated.div>
          ))}
        </div>
        <animated.img
          className="skater-img"
          src={skater}
          alt="not loaded"
          style={{ opacity }}
        ></animated.img>
        <div className="cmpny-text">
          {Texttrail.map(({ height, x, ...rest }, index) => (
            <animated.div
              key={index}
              style={{
                ...rest,
                transform: x.interpolate((x) => `translate(0,${x}px)`),
              }}
            >
              <animated.div
                style={{ height, display: "flex", alignItems: "center" }}
              >
                {websiteText[index]}
              </animated.div>
            </animated.div>
          ))}
        </div>
      </animated.div>
      <animated.div className="about-text" style={{ opacity }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </animated.div>
      <animated.div
        className="animated-down-holder"
        style={{
          transform: interpolate(
            [iconProps.scale, iconProps.x],
            (s, x) => `translateY(${x}px) scale(${s})`
          ),
        }}
      >
        <FaChevronDown className="animated-down"></FaChevronDown>
      </animated.div>
    </div>
  );
}

export default AboutPage;
