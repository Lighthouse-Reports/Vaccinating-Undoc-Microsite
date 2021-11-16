import React from "react";

function TransSimple(props) {
  const {fillPrimary} = props
  const strokeWidth = props.strokeWidth;
  return (
    <g> 
    <path class="cls-1" d="M13.14483,9.84728s-2.006,2.80038-4.48061,2.80038S4.18361,9.84728,4.18361,9.84728,6.18964,7.0469,8.66422,7.0469,13.14483,9.84728,13.14483,9.84728Z"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}/>
    <circle class="cls-2" cx="8.66422" cy="9.84728" r="1.50665"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}/>
    <polyline class="cls-1" points="9.957 6.678 9.957 5.646 7.913 3.352 2.855 3.352 2.855 12.499 5.632 12.499"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}/>
    <polyline class="cls-1" points="9.957 5.646 7.704 5.646 7.704 3.352"
      style={{stroke:fillPrimary,strokeWidth:strokeWidth}}/>
    </g>
  );
}

export default TransSimple;