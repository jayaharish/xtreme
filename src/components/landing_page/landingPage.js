//library imports
import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";

//stylesheets
import "./landingPage.css";

//function returns random color
function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)})`;
}

function LandingPage({ setHeight }) {
  //promises
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  }).then(() => {
    stopColor.current = true;
  });

  //refs
  const color = useRef(getRandomColor());
  const stopColor = useRef(false);

  //springs
  const { p1, p2, p3 } = useSpring({
    from: {
      p1: "#0c0a0a",
      p3: color.current,
      p2: "#0c0a0a",
    },
    to: async (next, cancel) => {
      while (1) {
        if (stopColor.current) color.current = "#0c0a0a";
        await next({ p1: "#0c0a0a", p3: "#0c0a0a", p2: color.current });
        await next({ p1: color.current, p2: "#0c0a0a", p3: "#0c0a0a" });
        await next({ p1: "#0c0a0a", p2: color.current, p3: "#0c0a0a" });
        await next({ p1: "#0c0a0a", p3: color.current, p2: "#0c0a0a" });
        if (stopColor.current) {
          setOpacity({ opacity: 0 });
          await next({ p1: "#0c0a0a", p3: "#0c0a0a", p2: "#0c0a0a" });
          setHeight();

          break;
        }
        color.current = getRandomColor();
      }
    },
    config: {
      duration: 1500,
    },
  });

  const [{ opacity }, setOpacity] = useSpring(() => ({
    opacity: 1,
  }));

  //return component
  return (
    <React.Fragment>
      <animated.svg
        className="landingText"
        viewBox="0 0 500 103"
        style={{ opacity }}
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="1"
            y1="0.5"
            x2="0"
            y2="0.5"
            gradientUnits="objectBoundingBox"
          >
            <animated.stop
              offset="0"
              style={{
                stopColor: p1.interpolate((p1) => p1),
              }}
            />
            <animated.stop
              offset="0.5"
              style={{ stopColor: p2.interpolate((p2) => p2) }}
            />
            <animated.stop
              offset="1"
              style={{ stopColor: p3.interpolate((p3) => p3) }}
            />
          </linearGradient>
        </defs>
        <animated.path
          id="Path_2"
          d="M-236.73-56.16l-25.22-45.24h20.28l14.95,29.38,14.95-29.38h20.15l-25.35,47.19L-187.46,0h-19.37l-19.89-37.96L-246.61,0h-19.5Zm94.12-27.56V0h-17.68V-83.72h-25.87V-101.4h69.42v17.68ZM-34.58,0h-24.7L-86.19-28.47a24.033,24.033,0,0,1-3.575-4.68A8.991,8.991,0,0,1-91-37.57q0-8.32,10.53-9.1,14.17-1.04,21-5.655T-52.65-66.3q0-8.71-5.265-13.065T-72.93-83.72h-19.5V0h-17.68V-101.4h37.57a48.2,48.2,0,0,1,14.95,2.275A35.449,35.449,0,0,1-45.435-92.5,30.982,30.982,0,0,1-37.31-81.64a35.416,35.416,0,0,1,2.99,14.95,36.931,36.931,0,0,1-1.56,10.4,29.913,29.913,0,0,1-5.2,10.01,34.247,34.247,0,0,1-9.62,8.255A41.84,41.84,0,0,1-65.65-33.02ZM25.48,0H-24.83V-101.4H24.7v17.68H-7.15v23.53H20.28v17.55H-7.15v24.96H25.48ZM91.52-96.85a10.53,10.53,0,0,1,4.55-4.1,13.432,13.432,0,0,1,5.59-1.235,6.87,6.87,0,0,1,5.46,2.4,9.5,9.5,0,0,1,2.08,6.435v61.75l43.42-65.26a10.627,10.627,0,0,1,4.485-4.1,13.289,13.289,0,0,1,5.655-1.235,6.87,6.87,0,0,1,5.46,2.4,9.5,9.5,0,0,1,2.08,6.435V0H152.62V-68.51L113.1-6.11a12.706,12.706,0,0,1-4.81,4.81A11.791,11.791,0,0,1,102.96,0a11.63,11.63,0,0,1-4.42-.845,10.886,10.886,0,0,1-3.64-2.4,11.762,11.762,0,0,1-2.47-3.64,11.561,11.561,0,0,1-.91-4.68V-68.51L48.1,0H27.04ZM231.79,0H181.48V-101.4h49.53v17.68H199.16v23.53h27.43v17.55H199.16v24.96h32.63Z"
          transform="translate(266.11 102.18)"
          fill="url(#linear-gradient)"
        />
      </animated.svg>
    </React.Fragment>
  );
}

export default LandingPage;
