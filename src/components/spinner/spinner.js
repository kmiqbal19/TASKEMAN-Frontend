import React from "react";
import "./spinner.scss";

function Spinner() {
  return (
    <div className="spinner__container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: "none", display: "block", shapeRendering: "auto" }}
        width="150px"
        height="150px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="33"
          stroke-width="5"
          stroke="#fff"
          stroke-dasharray="51.83627878423159 51.83627878423159"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
}

export default Spinner;
