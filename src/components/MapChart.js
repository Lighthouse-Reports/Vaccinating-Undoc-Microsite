import React, { useState, useRef, useEffect } from 'react';
import { colors, paddings, catInitials } from '../helpers/constants';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max } from 'd3-array';

function MapChart(props) {
  const { width, height, data, scoresExtent } = props;
  const chartPadding = paddings.mapChartBorder;
  const inBetweenPadding = paddings.mapChartInBetween;
  const lineHeight = height;
  const paddedWidth = width - chartPadding*2;

  const scaleX = scaleBand()
    .domain(range(0,data.subagg.length))
    .range([0, paddedWidth])
    .padding(inBetweenPadding);
    
  const scaleY = scaleLinear()
    .domain([
      0, 
      max([
        Math.abs(scoresExtent[0]),
        Math.abs(scoresExtent[1])
      ]) 
    ])
    .range([0, (chartPadding + lineHeight)/2]);

  // console.log(data)

  return (
    <g className="mapChart" width={width} height={height}>
      {
        data.subagg.map((category,i) => {
          // console.log(category,scaleY(+category.Scores),scaleX.bandwidth())
          const barAbsHeight = scaleY(Math.abs(category.Score));
          return <g key={"MapChartScore"+catInitials[category["Score Type"]]}>
            <rect 
              key={'bar'+i}
              height={barAbsHeight}
              width={scaleX.bandwidth()}
              x={chartPadding+scaleX(i)}
              y={+category.Score > 0
                // ? lineHeight - barAbsHeight - 10
                // : lineHeight + 10
                ? 1.1*lineHeight - barAbsHeight
                : 1.1*lineHeight 
              }
              fill={+category.Score > 0 ? colors.positive : colors.negative}
            />
            <circle
              r={8}
              cx={chartPadding+scaleX(i)+scaleX.bandwidth()/2}
              cy={lineHeight*.7}
              fill="none"
              strokeWidth="1"
              stroke={+category.Score > 0 ? colors.positive : colors.negative}
            />
            <text
              x={chartPadding+scaleX(i)+scaleX.bandwidth()/2}
              y={lineHeight*.7+4}
              textAnchor="middle"
              fontSize={11}
              fill={+category.Score > 0 ? colors.positive : colors.negative}
            >{catInitials[category["Score Type"]].initial}</text>
          </g>
        })
      }
    </g>
  )

}

export default MapChart;