import React, { useState, useEffect } from "react";
import BtnSlider from "./btnSlider";
import slideData from "./slideData";
import "./slider.scss";
function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideData.length !== slideIndex) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === slideData.length) {
      setSlideIndex(1);
    }
  };
  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(slideData.length);
    }
  };
  const moveDot = (index) => {
    setSlideIndex(index);
  };
  // Automate Slide
  useEffect(() => {
    if (slideIndex < 1) {
      setSlideIndex(slideData.length);
    } else if (slideIndex > slideData.length) {
      setSlideIndex(1);
    }
  }, [slideIndex]);
  useEffect(() => {
    const slideAuto = setInterval(() => {
      // console.log(slideIndex);
      setSlideIndex(slideIndex + 1);
    }, 3000);
    return () => {
      clearInterval(slideAuto);
    };
  }, [slideIndex]);
  return (
    <div className="slider__container">
      {slideData.map((item, index) => {
        return (
          <div
            className={
              slideIndex === index + 1
                ? "slider__slide slider__slide--active"
                : "slider__slide"
            }
            key={`slide-${index}`}
          >
            <p>{item.description}</p>
            <img src={item.imgUrl} alt="slide-img" />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />
      <div className="slider__dots--container">
        {Array.from({ length: 6 }).map((_, index) => {
          return (
            <div
              onClick={() => moveDot(index + 1)}
              className={
                slideIndex === index + 1
                  ? "slider__dot slider__dot--active"
                  : "slider__dot"
              }
              key={`slider-dot-${index}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
