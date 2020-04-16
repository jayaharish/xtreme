//library imports
import React, { useRef } from "react";
import { animated, useSpring, useSprings } from "react-spring";
//stylesheets
import "./Carousel.css";
//icons
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

//images
import im1 from "./assets/one.jpg";
import im2 from "./assets/two.jpg";
import im3 from "./assets/third.jpg";

const slides = [im1, im2, im3];

const springSlideFunction = (currentSlide) => (i) => ({
  x:
    i === currentSlide
      ? 0
      : i < currentSlide
      ? -(currentSlide - i) * 900
      : (i - currentSlide) * 900,
});

function Carousel(props) {
  //state variables
  const currentSlide = useRef(0);

  //gesture calculations
  const calc = (ev) => {
    let x = ev.clientX;
    let y = ev.nativeEvent.offsetY;
    console.log(x, y);
    return [-(y - 563 / 2) / 40, (900 / 2 - x) / 40, 1.025];
  };
  const trans = (x, y, s) =>
    `perspective(4500px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  //springs
  const [holderProp, setHolderProp] = useSpring(() => ({
    xys: [0, 0, 1],
  }));
  const [imgSpring, setImgSpring] = useSprings(
    slides.length,
    springSlideFunction(currentSlide.current)
  );

  const goNext = () => {
    if (currentSlide.current === slides.length - 1) currentSlide.current = 0;
    else currentSlide.current = currentSlide.current + 1;
    setImgSpring(springSlideFunction(currentSlide.current));
  };
  const goPrev = () => {
    if (currentSlide.current === 0) currentSlide.current = slides.length - 1;
    else currentSlide.current = currentSlide.current - 1;
    setImgSpring(springSlideFunction(currentSlide.current));
  };

  return (
    <div className="carousel-page">
      <animated.div
        style={{ transform: holderProp.xys.interpolate(trans) }}
        onMouseMove={(ev) => setHolderProp({ xys: calc(ev) })}
        onMouseLeave={() => setHolderProp({ xys: [0, 0, 1] })}
        className="carousel-left"
      >
        {imgSpring.map(({ x }, index) => (
          <animated.img
            key={index}
            className="carousel-imgs"
            style={{ transform: x.interpolate((x) => `translateX(${x}px)`) }}
            src={slides[index]}
          ></animated.img>
        ))}
        <div className="carousel-prev-tab" onClick={goPrev}>
          <FaChevronLeft />
        </div>
        <div className="carousel-next-tab" onClick={goNext}>
          <FaChevronRight />
        </div>
      </animated.div>
      <div className="carousel-right" onClick={goNext}></div>
    </div>
  );
}

export default Carousel;
