import React from "react";

function IdresSimple(props) {
  const {fillPrimary} = props
  const strokeWidth = props.strokeWidth;
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   data-name="Layer 1"
    //   viewBox="0 0 16 16"
    // >
    <g>
      <circle cx="10.409" cy="11.617" r="2.543" className="cls-1"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}></circle>
      <path
        d="M8.965 11.769L10.199 12.726 11.853 10.508"
        className="cls-2"
        style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
      ></path>
      <path
        d="M6.926 11.988H4.733v-2.57A2.769 2.769 0 017.502 6.65h1.065a2.769 2.769 0 012.481 1.539"
        className="cls-3"
        style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
      ></path>
      <path 
        d="M6.777 11.988L6.109 11.988 6.109 8.599" 
        className="cls-3"
        style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
      ></path>
      <rect
        width="3.196"
        height="3.652"
        x="6.437"
        y="2.436"
        className="cls-4"
        style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
        rx="1.598"
      ></rect>
    </g>
    // </svg>
  );
}

export default IdresSimple;
