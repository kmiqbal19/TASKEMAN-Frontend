import React from "react";
import "./slider.scss";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
function BtnSlider({ moveSlide, direction }) {
  return (
    <button
      className={
        direction === "next"
          ? "slider__btn slider__btn--next"
          : "slider__btn slider__btn--prev"
      }
      onClick={moveSlide}
    >
      {direction === "next" ? <AiOutlineRight /> : <AiOutlineLeft />}
    </button>
  );
}

export default BtnSlider;
