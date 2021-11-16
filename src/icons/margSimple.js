import React from "react";

function MargSimple(props) {
  const {fillPrimary} = props
  const strokeWidth = props.strokeWidth;
  return (
    <g>
    <path
        d="M7.397 7.502h1.206a3.05 3.05 0 013.05 3.05v2.803H4.347v-2.803a3.05 3.05 0 013.05-3.05z"
        className="cls-1"
        style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
      ></path>
      <path
        d="M10.131 9.639L10.131 13.355 5.869 13.355 5.869 9.639"
        className="cls-2"
        style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
      ></path>
      <rect
        width="3.536"
        height="4.005"
        x="6.232"
        y="2.645"
        className="cls-1"
        style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
        rx="1.76"
      ></rect>
      <path d="M4.843 8.885L11.138 8.885" className="cls-1"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}></path>
      <path d="M4.347 10.372L11.653 10.372" className="cls-1"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}></path>
      <path d="M4.347 11.858L11.653 11.858" className="cls-1"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}></path>
    </g>
  );
}

export default MargSimple;