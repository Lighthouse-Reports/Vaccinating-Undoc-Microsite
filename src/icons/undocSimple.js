import React from "react";

function UndocSimple(props) {
  const {fillPrimary,strokeWidth} = props
  return (
    <g>
    <path
      d="M7.403 7.37h1.194a3.104 3.104 0 013.104 3.104v2.88H4.3v-2.88A3.104 3.104 0 017.403 7.37z"
      className="cls-1"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
    ></path>
    <path
      d="M10.159 9.555L10.159 13.355 5.841 13.355 5.841 9.555"
      className="cls-2"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
    ></path>
    <rect
      width="3.583"
      height="4.095"
      x="6.208"
      y="2.645"
      className="cls-1"
      rx="1.792"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
    ></rect>
    <path
      d="M6.976 9.772a1.109 1.109 0 011.11-1.11 1.109 1.109 0 011.108 1.11v.279c0 .621-1.125.582-1.125 1.125v.472"
      className="cls-1"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
    ></path>
    <path 
      d="M8.085 12.062L8.085 12.498" 
      className="cls-1" 
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}
    ></path>
    </g>
  );
}

export default UndocSimple;