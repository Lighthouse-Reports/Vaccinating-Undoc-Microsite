import React, { useState, useRef, useEffect } from 'react';
import { colors, paddings, catInitials } from '../helpers/constants';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max, extent } from 'd3-array';

function ScorecardWaterfallChart(props) {
  const { width, height, data } = props;
  const { subagg, agg } = data;
  const chartPadding = paddings.waterfallChartBorder;
  const inBetweenPadding = paddings.waterfallChartInBetween;
  const lineHeight = height/2;
  const paddedWidth = width - chartPadding*2;


  const prepData = (subagg, agg) => {
    let dataForChart = Object.keys(catInitials).map(category => {
      const catObject = {...subagg[category][0]}
      return catObject;
    });

    let cumSum = 0;
    for (let i=0; i< dataForChart.length; i++) {
      dataForChart[i].start = cumSum;
      dataForChart[i].end = cumSum + dataForChart[i]["Score"];
      cumSum += dataForChart[i]["Score"];
    }
    
    const scoresExtent = extent([...dataForChart.map(cat => cat.start),...dataForChart.map(cat => cat.end)])
    const scoresPosMax = max([Math.abs(scoresExtent[1]),0])
    const scoresNegMax = max([Math.abs(scoresExtent[0]),0])

    return {
      components: dataForChart,
      aggregate: dataForChart[dataForChart.length-1].end,
      scoresExtent: scoresExtent,
      scoresPosMax: scoresPosMax,
      scoresNegMax: scoresNegMax
    };
  }

  const dataForChart = prepData(subagg,agg);

  console.log(dataForChart)

  const scaleX = scaleBand()
    .domain(range(0,dataForChart.components.length + 1))
    .range([0, 80*(dataForChart.components.length + 1)])
    .padding(inBetweenPadding);
  

  const scaleY = scaleLinear()
    .domain([
      0, 
      max([dataForChart.scoresNegMax,dataForChart.scoresPosMax]) 
    ])
    .range([0, lineHeight]);
  
  
  // (value) => {
  //   console.log(value)
  //   return value > 0
  //     ? scaleLinear()
  //       .domain([0,dataForChart["scoresPosMax"]])
  //       .range([0,lineHeight])(value)
  //       // .range([0,200])(value)
  //     : scaleLinear()
  //       .domain([0,dataForChart["scoresNegMax"]])
  //       .range([0,lineHeight])(Math.abs(value))
  //       // .range([0,200])(Math.abs(value))
  // }


  return (
    <div style={{display:"block"}}>
    <svg  width={width} height={height*1.2}>
      <line
        x1={0} 
        y1={height*.6 - chartPadding/2}
        x2={width} 
        y2={height*.6 - chartPadding/2}
        stroke="black"
        strokeDasharray="5,5"
      />
      <g className="scoreCardWaterFallChart">
      {
        dataForChart["components"].map((category,i) => {
          const barAbsHeight = scaleY(Math.abs(category.Score));
          const barStart = scaleY(category.start)
          const y = +category.Score > 0
            ? 1.1*lineHeight - barAbsHeight - barStart
            : 1.1*lineHeight - barStart
          return <g>
            <rect
              key={'bar'+i}
              height={barAbsHeight}
              width={scaleX.bandwidth()}
              x={chartPadding+scaleX(i)}
              y={y}
              fill={+category.Score > 0 ? colors.positive : colors.negative}
            />
            {
              i < dataForChart["components"].length - 1
              ? <line 
                  x1={chartPadding+scaleX(i)} 
                  y1={+category.Score > 0 ? y : y + barAbsHeight}
                  x2={chartPadding+scaleX(i+1)  + scaleX.bandwidth()} 
                  y2={+category.Score > 0 ? y : y + barAbsHeight}
                  stroke="black" 
                />
              : null
            }
          </g>
        })
      }
      <rect
        key={'barAgg'}
        height={scaleY(Math.abs(dataForChart["aggregate"]))}
        width={scaleX.bandwidth()}
        x={chartPadding+scaleX(dataForChart["components"].length)}
        y={+dataForChart["aggregate"] > 0
          ? 1.1*lineHeight - scaleY(Math.abs(dataForChart["aggregate"]))
          : 1.1*lineHeight}
        fill={+dataForChart["aggregate"] > 0 ? colors.positive : colors.negative}
      />
      {/* {
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
      } */}
    </g>
    </svg>
    </div>
  )

}

export default ScorecardWaterfallChart;