import React, { useState, useRef, useEffect } from 'react';
import { colors, paddings, catInitials, hexCatTextLabels } from '../helpers/constants';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max } from 'd3-array';
import { useTranslation } from 'react-i18next';

function MapChart(props) {
  const { country, width, height, data, scoresExtent, edge, labelOnly,
    hoverCountry, selectHoverCountry, selectHighlightCountry, expandCat, 
    setExpandCat, labelWidths } = props;
  const chartPadding = paddings.mapChartBorder;
  const inBetweenPadding = paddings.mapChartInBetween;
  const lineHeight = height;
  const paddedWidth = width - chartPadding*2;;
  const [localExpandCat, setLocalExpandCat] = useState("");

  // const labelsRef = useRef([]);
  // const [labelWidths, setLabelWidths] = useState({});

  // console.log(labelWidths)

  const { t } = useTranslation();

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

  const scoreMouseOver = (category) => {
    // console.log(category);
    setExpandCat(category);
    setLocalExpandCat(category);
    selectHoverCountry(country);
  }

  const scoreMouseOut = (category) => {
    // console.log(category);
    setExpandCat("");
    setLocalExpandCat("");
    selectHoverCountry("");
  }


  const getGridEdgeAwareXPosTextAnchor = (index) => {
    let position = edge === "left" 
      ? "start" 
      : edge === "right" 
        ? "end" 
        : "middle";
    if (edge === "left" && index > data.subagg.length/2 + 1) position = "middle"
    if (edge === "right" && index < data.subagg.length/2 - 2) position = "middle"

    return {
      textAnchor: position === 'end' ? 'start' : position,
      position: position
    };
  }


  const getGridEdgeAwareXPos = (index,initialPosition,thingWidth,isText) => {
    const { position, textAnchor } = getGridEdgeAwareXPosTextAnchor(index);
    let returnPos = initialPosition;
    if (textAnchor === "middle") return initialPosition;
    if (position === "start") returnPos = hexCatTextLabels.r;
    // if (textAnchor === "end") return initialPosition - thingWidth/2 + chartPadding+scaleX(index) + hexCatTextLabels.r;
    if (position === "end") returnPos = chartPadding+paddedWidth-thingWidth+hexCatTextLabels.r*2

    if (isText) returnPos += hexCatTextLabels.r*1

    return returnPos
  }

  // console.log(data)

  /* Text Background Rounded Rect */
  const getTextBackGroundRoundedRect = (category,i) => {
    // const labelBBox = labelsRef.current[i] ? labelsRef.current[i].getBBox() : {width:0,height:0};
    // if (labelBBox.width > 0 && labelWidths[i] === undefined) setLabelWidths({...labelWidths,[i]:labelBBox.width+hexCatTextLabels.r*2})
    // console.log(labelWidths)
    return <rect
      x={
        getGridEdgeAwareXPos(i,
          chartPadding+scaleX(i)
          + scaleX.bandwidth()/2 
          - hexCatTextLabels.r
          - (
            expandCat === category["Score Type"] 
            // ? hexCatTextLabels.catLength[category["Score Type"]]/2 - hexCatTextLabels.r 
            ? labelWidths[i]/2 - hexCatTextLabels.r 
            : 0
            ),
          // hexCatTextLabels.catLength[category["Score Type"]]
          labelWidths[i]
        )
      }
      y={lineHeight*.7 - hexCatTextLabels.r}
      rx={hexCatTextLabels.r}
      ry={hexCatTextLabels.r}
      // width={
      //     expandCat === category["Score Type"] && country === hoverCountry
      //     ? hexCatTextLabels.catLength[category["Score Type"]]
      //     : 0
      //   }
      width={
        labelWidths[i]
      }
      height={2 * hexCatTextLabels.r}
      fill={
        expandCat === category["Score Type"] && country === hoverCountry 
        ? "white" : "none" 
      }
      strokeWidth={
        expandCat === category["Score Type"] && country === hoverCountry
        ? 1
        : 0
      }
      stroke={+category.Score > 0 ? colors.positive : colors.negative}
      className={"hexChartElement"}
      onMouseOver={() => scoreMouseOver(category["Score Type"])}
      onTouchStart={() => scoreMouseOver(category["Score Type"])}
      onMouseOut={() => scoreMouseOut(category["Score Type"])}
      onTouchEnd={() => scoreMouseOut(category["Score Type"])}
      onClick={() => selectHighlightCountry(country)}
      />
  }


  /* Label */
  const getTextLabel = (category,i) => <text
      x={
        getGridEdgeAwareXPos(i,
          chartPadding+scaleX(i)+scaleX.bandwidth()/2,
          // hexCatTextLabels.catLength[category["Score Type"]],
          labelWidths[i],
          true
        )
      }
      y={lineHeight*.7+4}
      textAnchor={getGridEdgeAwareXPosTextAnchor(i).textAnchor}
      fontSize={"0.8em"}
      fill={+category.Score > 0 ? colors.positive : colors.negative}
      className={"hexChartElement"}
      onMouseOver={() => scoreMouseOver(category["Score Type"])}
      onTouchStart={() => scoreMouseOver(category["Score Type"])}
      onMouseOut={() => scoreMouseOut(category["Score Type"])}
      onTouchEnd={() => scoreMouseOut(category["Score Type"])}
      onClick={() => selectHighlightCountry(country)}
      // ref={el => labelsRef.current[i] = el}
    >
      {
        expandCat === category["Score Type"] && country === hoverCountry
        ? t(category["Score Type"])
        : localExpandCat !== category["Score Type"] && localExpandCat !== ""
          ? ""
          : ""
          // : catInitials[category["Score Type"]].initial
      }
    </text>

  return (
    labelOnly === true
    ? <g className="mapChart" width={width} height={height} className={"hexChartElement"}>
      {
        data.subagg.map((category,i) => {
          // console.log(category,scaleY(+category.Scores),scaleX.bandwidth())
          // const barAbsHeight = scaleY(Math.abs(category.Score));
          return <g>
            {getTextBackGroundRoundedRect(category,i)}
            {getTextLabel(category,i)}
          </g>
          
        })
      }
      </g>
    : <g className="mapChart" width={width} height={height} className={"hexChartElement"}>
      {
        data.subagg.map((category,i) => {
          // console.log(category,scaleY(+category.Scores),scaleX.bandwidth())
          const barAbsHeight = scaleY(Math.abs(category.Score));
          return <g 
              key={"MapChartScore"+i}

              className={"hexChartElement"}
              // style={{outline: "solid 1px blue"}}
            >
              {/* Background Bar */}
              <rect
                height={height}
                width={scaleX.bandwidth()}
                x={chartPadding+scaleX(i)}
                y={height/2}
                fill={
                  localExpandCat === category["Score Type"]
                  ? colors.neutral
                  : "rgba(255,255,255,0)"
                }
                opacity={0.1}
                className={"hexChartElement"}
                onMouseOver={() => scoreMouseOver(category["Score Type"])}
                onTouchStart={() => scoreMouseOver(category["Score Type"])}
                onMouseOut={() => scoreMouseOut(category["Score Type"])}
                onTouchEnd={() => scoreMouseOut(category["Score Type"])}
                onClick={() => selectHighlightCountry(country)}
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
                onTouchStart={() => scoreMouseOver(category["Score Type"])}
                onMouseOut={() => scoreMouseOut(category["Score Type"])}
                onTouchEnd={() => scoreMouseOut(category["Score Type"])}
                onClick={() => selectHighlightCountry(country)}
              />

              {/* Text Background Rounded Rect */}

              {/* {getTextBackGroundRoundedRect(category,i)} */}
              {/* <rect
                x={
                  getGridEdgeAwareXPos(i,
                    chartPadding+scaleX(i)
                    + scaleX.bandwidth()/2 
                    - hexCatTextLabels.r
                    - (localExpandCat === category["Score Type"]? hexCatTextLabels.catLength[category["Score Type"]]/2 - hexCatTextLabels.r : 0),
                    hexCatTextLabels.catLength[category["Score Type"]]
                  )
                }
                y={lineHeight*.7 - hexCatTextLabels.r}
                rx={hexCatTextLabels.r}
                ry={hexCatTextLabels.r}
                width={
                    localExpandCat === category["Score Type"]
                    ? hexCatTextLabels.catLength[category["Score Type"]]
                    : localExpandCat !== category["Score Type"] && localExpandCat !== ""
                      ? 0
                      : 2 * hexCatTextLabels.r
                  }
                height={2 * hexCatTextLabels.r}
                fill={localExpandCat !== category["Score Type"] ? "none" : "white" }
                strokeWidth={
                  localExpandCat !== category["Score Type"]
                  ? 0
                  : 1
                }
                stroke={+category.Score > 0 ? colors.positive : colors.negative}
                className={"hexChartElement"}
                onMouseOver={() => scoreMouseOver(category["Score Type"])}
                onMouseOut={() => scoreMouseOut(category["Score Type"])}
              /> */}


              {/* Label */}
              {/* {getTextLabel(category,i)} */}
              {/* <text
                x={
                  getGridEdgeAwareXPos(i,
                    chartPadding+scaleX(i)+scaleX.bandwidth()/2,
                    hexCatTextLabels.catLength[category["Score Type"]],
                    true
                  )
                }
                y={lineHeight*.7+4}
                textAnchor={getGridEdgeAwareXPosTextAnchor(i).textAnchor}
                fontSize={"0.8em"}
                fill={+category.Score > 0 ? colors.positive : colors.negative}
                className={"hexChartElement"}
                onMouseOver={() => scoreMouseOver(category["Score Type"])}
                onMouseOut={() => scoreMouseOut(category["Score Type"])}
              >
                {
                  localExpandCat === category["Score Type"]
                  ? category["Score Type"]
                  : localExpandCat !== category["Score Type"] && localExpandCat !== ""
                    ? ""
                    : ""
                    // : catInitials[category["Score Type"]].initial
                }
              </text> */}

              {/* Icon */}
              { 
                localExpandCat === ""
                ? catInitials[category["Score Type"]]
                  .iconSimple(
                    chartPadding+scaleX(i)+ scaleX.bandwidth()/2 - hexCatTextLabels.r*1.3,
                    lineHeight*.7 - hexCatTextLabels.r,
                    hexCatTextLabels.r*3,
                    +category.Score > 0 ? colors.positive : colors.negative
                  )
                : null
              }
          </g>
        })
      }
    </g>
    
  )

}

export default MapChart;