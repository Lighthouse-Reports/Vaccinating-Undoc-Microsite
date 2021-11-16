import React, { useState, useRef, useEffect } from 'react';
import { colors, paddings, catInitials, hexCatTextLabels } from '../helpers/constants';
import { getGoodOrBad } from "../helpers/getGoodOrBad";
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max } from 'd3-array';
import { color } from 'd3-color';

function BigHexComponent(props) {
  const { width, height, dx, dy, data, scoresExtent, countryInfo, 
    highlightCat, edge, noCountryLabel, noHex, multiplier, iconsPathPrefix, overall } = props;
  const padding = paddings.mainMap;
  const chartPadding = paddings.mapChartBorder;
  const inBetweenPadding = paddings.mapChartInBetween;
  const lineHeight = height;
  const paddedWidth = width - chartPadding*2;
  const hexWidth = width*1.5;
  const hexHeight = (hexWidth) * 2/ Math.sqrt(3);

  const [expandCat, setExpandCat] = useState("");

  useEffect(() => {
    setExpandCat(highlightCat)
  }, [highlightCat])

  const multiplierSecondary = 1.2*.8;

  const startX = width*.3;


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
    .range([0, (lineHeight)/2]);

  const scoreMouseOver = (category) => {
    setExpandCat(category);
  }

  const scoreMouseOut = (category) => {
    // console.log(category);
    setExpandCat("");
  }


  const mainColor = getGoodOrBad(overall) === 'good' ? colors.positive : getGoodOrBad(overall) === 'bad' ? colors.negative : colors.border;

  const {x,y,hexPointsString} = calcPos(1,1,hexWidth,hexHeight);

  return (
    <g className="bigHexComponent" width={width} height={height}  transform={"translate("+(dx-hexWidth/2-padding)+","+dy+")"}>
      {
        noHex
        ? null
        : <g key={"bigHex"}>
            <polygon 
              points={hexPointsString}
              stroke={mainColor} 
              strokeWidth="1" 
              fill="white"
            />
          </g>
      }

      {
        noCountryLabel
        ? null
        : <g>
            <image 
              href={iconsPathPrefix+countryInfo.country_name.replace(" ","_")+"_96.png"} 
              height="30" 
              width="30" 
              x={hexWidth*.27}
              y={hexHeight*.21}
              className={"flag"}
            />
            <text 
              x={hexWidth*.4}
              y={hexHeight*.27}
              fontSize={(0.6*multiplier)+"em"}
              textAnchor="start"
            >
              {countryInfo.country_name}
            </text>
          </g>
      }
      

      {
        data.subagg.map((category,i) => {
          // console.log(category,scaleY(+category.Scores),scaleX.bandwidth())
          const barAbsHeight = scaleY(Math.abs(category.Score));
          return <g 
              key={"MapChartScore"+catInitials[category["Score Type"]]}
              transform={"translate("+(startX)+","+0+")"}
              // style={{outline: "solid 1px blue"}}
            >

              {/* Hex Outline */}
              {/* <clipPath id="hexMaxExtent" transform={"translate("+(-width*.3)+","+(height/20)+")"}>
                <polygon 
                  points={hexPointsString}
                />
              </clipPath> */}

              {/* Background Bar */}
              <rect
                height={height}
                width={scaleX.bandwidth()}
                x={chartPadding+scaleX(i)}
                y={height/2}
                fill={
                  expandCat === category["Score Type"]
                  ? colors.neutral
                  : "rgba(255,255,255,0)"
                }
                opacity={0.1}
                onMouseOver={() => scoreMouseOver(category["Score Type"])}
                onMouseOut={() => scoreMouseOut(category["Score Type"])}
                clipPath="url(#hexMaxExtent)"
              />


              {/* Main Bar */}
              <rect 
                key={'bar'+i}
                height={+category.Score === 0 ? 1 : barAbsHeight}
                width={scaleX.bandwidth()}
                x={chartPadding+scaleX(i)}
                y={+category.Score > 0
                  // ? lineHeight - barAbsHeight - 10
                  // : lineHeight + 10
                  ? 1.1*lineHeight - barAbsHeight
                  : 1.1*lineHeight 
                }
                strokeWidth={1}
                stroke={+category.Score > 0 ? colors.positive : (+category.Score === 0 ? colors.neutral : colors.negative)}
                fill={
                  expandCat === category["Score Type"]
                  ? colors.highlight
                  : (+category.Score > 0 ? colors.positive : (+category.Score === 0 ? colors.neutral : colors.negative))
                }
                className={"hexChartElement"}
                onMouseOver={() => scoreMouseOver(category["Score Type"])}
                onMouseOut={() => scoreMouseOut(category["Score Type"])}
              />

              {/* Text Background Rounded Rect */}
              <rect
                x={
                  chartPadding+scaleX(i)
                  + scaleX.bandwidth()/2 
                  // - (multiplierSecondary*2*hexCatTextLabels.r)
                  - (expandCat === category["Score Type"]
                    ? multiplierSecondary*hexCatTextLabels.catLength[category["Score Type"]]/2 
                    : 0)}
                y={lineHeight*.68 - multiplierSecondary*hexCatTextLabels.r*2}
                rx={multiplierSecondary*hexCatTextLabels.r}
                ry={multiplierSecondary*hexCatTextLabels.r}
                width={
                    expandCat === category["Score Type"]
                    ? multiplierSecondary*hexCatTextLabels.catLength[category["Score Type"]]
                    : expandCat !== category["Score Type"] && expandCat !== ""
                      ? 0
                      : 2 * multiplierSecondary * hexCatTextLabels.r
                  }
                height={2 * multiplierSecondary * hexCatTextLabels.r}
                fill="white"
                strokeWidth={
                  expandCat !== category["Score Type"]
                  ? 0
                  : 1
                }
                stroke={+category.Score > 0 ? colors.positive : colors.negative}
                className={"hexChartElement"}
                onMouseOver={() => scoreMouseOver(category["Score Type"])}
                onMouseOut={() => scoreMouseOut(category["Score Type"])}
              />


              {/* Label */}
              <text
                x={
                  chartPadding+scaleX(i)+scaleX.bandwidth()/2
                }
                y={lineHeight*.7 - multiplierSecondary*hexCatTextLabels.r}
                textAnchor={"middle" }
                fontSize={(0.85*multiplierSecondary)+"em"}
                fill={+category.Score > 0 ? colors.positive : colors.negative}
                className={"hexChartElement"}
                onMouseOver={() => scoreMouseOver(category["Score Type"])}
                onMouseOut={() => scoreMouseOut(category["Score Type"])}
              >
                {
                  expandCat === category["Score Type"]
                  ? category["Score Type"]
                  : expandCat !== category["Score Type"] && expandCat !== ""
                    ? ""
                    : ""
                }
              </text>

              {/* Icon */}
              { 
                expandCat === category["Score Type"] || expandCat === ""
                ? catInitials[category["Score Type"]]
                  .iconSimple(
                    chartPadding+scaleX(i)+ scaleX.bandwidth()/2 - hexCatTextLabels.r*1.5*multiplier,
                    lineHeight*.7 - hexCatTextLabels.r,
                    hexCatTextLabels.r*multiplier*2,
                    +category.Score > 0 ? colors.positive : colors.negative,
                    "big"
                  )
                : catInitials[category["Score Type"]]
                  .iconSimple(
                    chartPadding+scaleX(i)+ scaleX.bandwidth()/2 - hexCatTextLabels.r*1.5*multiplier,
                    lineHeight*.7 - hexCatTextLabels.r,
                    hexCatTextLabels.r*multiplier*2,
                    colors.neutral,
                    "big"
                  )
              }


              
          </g>
        })
      }
    </g>
  )

}

export default BigHexComponent;