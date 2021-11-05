import React, { useState, useRef, useEffect } from 'react';
import MapChart from './MapChart';
import { paddings } from '../helpers/constants';

function MainMap(props) {

  const { width, height, data } = props;
  const { gridMax, countryData, countryCodesArray, blanks, categoryScoresExtent } = data;
  const padding = paddings.mainMap;
  const hexWidth = (width-padding*2)/(gridMax.x+0.5);
  const hexHeight = (hexWidth) * 2/ Math.sqrt(3);

  const calcPos = (gridPosX,gridPosY,currentWidth,currentHeight) => {
    let x = (gridPosX-1) * currentWidth + padding;
    let y = (gridPosY-1) * currentHeight*3/4 + padding;

    if (gridPosY % 2 === 0) x += currentWidth/2;

    const hexPoints = [
      [x + currentWidth/2, y],
      [x + currentWidth, y + currentHeight/4],
      [x + currentWidth, y + currentHeight*3/4],
      [x + currentWidth/2, y + currentHeight],
      [x, y + currentHeight*3/4],
      [x, y + currentHeight/4],
    ]

    const hexPointsString = hexPoints.map(point => point[0] + " " + point[1]).join(",")

    return {x, y, hexPoints, hexPointsString}
  }

  return (
    <div>
      <svg className="hexGrid" width={width} height={height}>
        {
          blanks.map((currentBlank,i) => {
            const {x,y,hexPointsString} = calcPos(currentBlank.grid_pos_x,currentBlank.grid_pos_y,hexWidth,hexHeight);
            return <g key={"blankHex"+i}>
              <polygon 
                points={hexPointsString}
                stroke="black" 
                strokeWidth="1" 
                fill="none"
              />
            </g>
          })
        }
        {
          countryCodesArray.map(country => {
            const {x,y,hexPointsString} = calcPos(country.grid_pos_x,country.grid_pos_y,hexWidth,hexHeight);
            return <g key={country.iso3}>
              <polygon 
                points={hexPointsString}
                stroke="black" 
                strokeWidth="1" 
                fill="none"
              />
              <text 
                x={x+hexWidth/2}
                y={y+hexHeight*1/4}
                fontSize={13}
                textAnchor="middle"
              >
                {country.country_name}
              </text>
              <g className="mapChartHolder" transform={"translate("+x+","+y+")"}>
                <MapChart
                  width={hexWidth}
                  height={hexHeight/2}
                  data={countryData[country.iso3]}
                  scoresExtent={categoryScoresExtent}
                />
              </g>
            </g>
            
          })
        }
      </svg>
    </div>
  )

}

export default MainMap;