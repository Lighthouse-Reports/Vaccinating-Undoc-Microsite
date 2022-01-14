import React, { useState, useRef, useEffect } from 'react';
import { colors, paddings, catInitials, hexCatTextLabels, iconsPathPrefix } from '../helpers/constants';
import { getGoodOrBad } from "../helpers/getGoodOrBad";
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max } from 'd3-array';
import { color } from 'd3-color';
import { useTranslation } from 'react-i18next';
import { Button, Label } from 'semantic-ui-react';

function BigHexComponent(props) {
  const { width, height, dy, data, scoresExtent, countryInfo, 
    highlightCat, edge, noCountryLabel, noHex, multiplier, overall,
    labelWidths, parentWidth } = props;
  const padding = paddings.mainMap;
  const chartPadding = paddings.mapChartBorder;
  const inBetweenPadding = paddings.mapChartInBetween;
  const paddedWidth = width - chartPadding*2;
  const hexWidth = width*1.5 > parentWidth ? parentWidth-padding : width*1.5-padding;
  const hexHeight = (hexWidth) * 2/ Math.sqrt(3);
  const lineHeight = hexWidth/1.5;

  const [expandCat, setExpandCat] = useState("");
  const { t } = useTranslation();

  const countryNameRef = useRef();
  const [countyNameStartX, setCountryNameStartX] = useState(hexWidth*.27) 

  // console.log(hexWidth,parentWidth)

  useEffect(() => {
    let countryNameBBox = countryNameRef.current.getBBox();
    // console.log(countryNameRef)
    if (countryNameBBox && countryNameBBox.width > 0) {
      setCountryNameStartX((hexWidth-countryNameBBox.width)/2)
    }
  }, [countryNameRef && countryNameRef.current && countryNameRef.current.getBBox().width])

  useEffect(() => {
    setExpandCat(highlightCat)
  }, [highlightCat])

  const multiplierSecondary = 1;

  const startX = (hexWidth - width)/2;

  const calcPos = (gridPosX,gridPosY,currentWidth,currentHeight) => {
    let x = (gridPosX-1) * currentWidth;
    let y = (gridPosY-1) * currentHeight*3/4 + padding;

    // let x = (gridPosX-1) * currentWidth + padding;
    // let y = (gridPosY-1) * currentHeight*3/4 + padding;


    // console.log("currentWidth: " + currentWidth)

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
    // console.log(category);
    setExpandCat(category);
  }

  const scoreMouseOut = (category) => {
    setExpandCat("");
  }


  const mainColor = getGoodOrBad(overall) === 'good' ? colors.positive : getGoodOrBad(overall) === 'bad' ? colors.negative : colors.border;

  const {x,y,hexPointsString} = calcPos(1,1,hexWidth,hexHeight);

  return (
    <g className="bigHexComponent" 
      width={width} 
      height={height}  
      transform={"translate("+((parentWidth-hexWidth)/2-padding)+","+dy+")"}
      >
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
        : <g ref={countryNameRef}>
            <image 
              href={iconsPathPrefix+"flaground/"+countryInfo.country_name.replace(" ","_")+"_96.png"} 
              height="30" 
              width="30" 
              x={countyNameStartX}
              y={hexHeight*.21}
              className={"flag"}
            />
            <text 
              x={countyNameStartX+40}
              y={hexHeight*.27}
              fontSize={(0.6*multiplier)+"em"}
              textAnchor="start"
            >
              {t(countryInfo.country_name)}
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

              {/* Text label with rounded rect background*/}
              <switch>
              <foreignObject
                className={'bigHexLabelHolderForeignObject'}
                x={-startX}
                y={lineHeight*.2 - multiplierSecondary*hexCatTextLabels.r*2}
                width={hexWidth}
                height={100}
              >
                <div 
                  xmlns="http://www.w3.org/1999/xhtml"
                  className={"bigHexLabelHolder"}
                >
                  {
                    expandCat === category["Score Type"]
                    ? <Label 
                        // pointing="below"
                        basic
                        className={"bigHexCatLabel" + (+category.Score > 0 ? " good" : " bad")}
                      >
                          {
                            expandCat === category["Score Type"]
                            ? t(category["Score Type"])
                            : expandCat !== category["Score Type"] && expandCat !== ""
                              ? ""
                              : ""
                          }
                      </Label>
                    : null
                  }
                  
                </div>
              </foreignObject>
              </switch>

              {/* Text Background Rounded Rect */}
              {/* <rect
                x={
                  chartPadding+scaleX(i)
                  + scaleX.bandwidth()/2 
                  // - (multiplierSecondary*2*hexCatTextLabels.r)
                  - (expandCat === category["Score Type"]
                    // ? multiplierSecondary*hexCatTextLabels.catLength[category["Score Type"]]/2 
                    ? multiplierSecondary * labelWidths[i]/2 
                    : 0)}
                y={lineHeight*.68 - multiplierSecondary*hexCatTextLabels.r*2}
                rx={multiplierSecondary*hexCatTextLabels.r}
                ry={multiplierSecondary*hexCatTextLabels.r}
                width={
                    expandCat === category["Score Type"]
                    // ? multiplierSecondary*hexCatTextLabels.catLength[category["Score Type"]]
                    ? multiplierSecondary * labelWidths[i]
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
              /> */}


              {/* Label */}
              {/* <text
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
                  ? t(category["Score Type"])
                  : expandCat !== category["Score Type"] && expandCat !== ""
                    ? ""
                    : ""
                }
              </text> */}

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