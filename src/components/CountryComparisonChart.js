import React, { useState, useRef, useEffect } from 'react';
import { colors, paddings, catInitials, comparisonInfo, iconsPathPrefix, scoreThresholds } from '../helpers/constants';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max, extent, median } from 'd3-array';
import { forceSimulation, forceManyBody, forceX, forceY, 
  forceCollide } from 'd3-force';
import { Grid, Popup, Icon, Checkbox } from 'semantic-ui-react';
import { saveSvg } from '../helpers/saveSvg';
import { getGoodOrBad } from '../helpers/getGoodOrBad';

function CountryComparisonChart(props) {
  const { data, range, countryProfiles, category } = props;

  const categoryId = category.replace(" ", "_")
  const [width, setWidth] = useState();
  // const { subagg, agg } = data;
  const chartPadding = paddings.waterfallChartBorder;
  const inBetweenPadding = paddings.waterfallChartInBetween;
  const paddedWidth = width - chartPadding*2;
  const [animatedNodes, setAnimatedNodes] = useState([]);
  const [verticalOrientation, setVerticalOrientation] = useState(false);
  // const [data, setData] = useState([]);
  // console.log(verticalOrientation);

  const containerRef = useRef();
  const chartRef = useRef();

  const [scatter, setScatter] = useState(false);
  const categoryScoreKey = (category === "overall") ? 'overall_score' : 'score-'+category;
  const categoryConfidenceKey = (category === "overall") ? 'overall_confidence' : 'CScore-'+category;

  const medianConfidence = median(Object.keys(countryProfiles).map(iso => {
    return countryProfiles[iso]['overall_confidence']
  }))


  // This function calculates width and height of the list
  const getContainerSize = () => {
    const newWidth = chartRef.current ? chartRef.current.clientWidth : 0;
    setWidth(newWidth);

    if (newWidth < comparisonInfo.widthCutOffForLabels) {
      // console.log("Setting vertical orientation to true");
      setVerticalOrientation(true);
    } else if (newWidth > comparisonInfo.widthCutOffForLabels) {
      // console.log("Setting vertical orientation to false");
      setVerticalOrientation(false);
    }
    
    // console.log(newWidth,verticalOrientation,category);
  };

  // console.log(animatedNodes);

  // useEffect(() => {
  //   getListSize();
  // }, [listItems]);

  // const forceCollideWith = comparisonInfo.size*comparisonInfo.forceCollideMultiple;

  useEffect(() => {
    window.addEventListener("resize", getContainerSize);
  }, []);

  useEffect(() => {
    getContainerSize();
  }, []);


  const getPos = (isOverall,category,iso,showScatter) => {
    if (showScatter) {
      return getPosScatter(isOverall,category,iso)
    } else {
      return getPosBuckets(isOverall,category,iso)
    }
  }

  const getPosScatter = (isOverall,category,iso) => {
    // console.log(+countryProfiles[iso][categoryScoreKey])
    return {x: +countryProfiles[iso][categoryScoreKey], y: +countryProfiles[iso][categoryConfidenceKey]}
  }

  const getPosBuckets = (isOverall,category,iso) => {
    let returnVal = ''
    if (isOverall) {
      returnVal = countryProfiles[iso]['overall_confidence_rank'] === "weak" 
        ? comparisonInfo.neutralXVal
        : getGoodOrBad(countryProfiles[iso]['overall_rank']) === "good"
          ? comparisonInfo.positiveXVal
          : comparisonInfo.negativeXVal
    } else {
      returnVal = countryProfiles[iso]['C-'+category] === "weak" 
        ? comparisonInfo.neutralXVal
        : countryProfiles[iso]['open_categories'].includes(category)
          ? comparisonInfo.positiveXVal
          : comparisonInfo.negativeXVal
    }
    return { x: returnVal, y: comparisonInfo.fixedHeight(verticalOrientation)/2 }
  }

  useEffect(() => {
    const simulation = forceSimulation()
      .force("x", forceX(d => {
          const value = getPos(category === "overall",category,d.Iso3,scatter);
          return scaleX(scatter)(scatter ? value.x : (verticalOrientation ? value.y : value.x));  
        }).strength(comparisonInfo.strength))
      .force("y", forceY(d => {
        const value = getPos(category === "overall",category,d.Iso3,scatter);
        // console.log(value,scaleY(scatter)(value.y))
        return scaleY(scatter)(scatter ? value.y : (verticalOrientation ? value.x : value.y));  
      }).strength(comparisonInfo.strength))
      .force("charge", forceManyBody().strength(scatter ? 0 : comparisonInfo.charge))
      .force('collide', forceCollide(
          scatter 
          ? comparisonInfo.size*comparisonInfo.forceCollideMultipleScatter
          : width > comparisonInfo.widthCutOffForLabels 
              ? comparisonInfo.size*comparisonInfo.forceCollideMultipleBig
              : comparisonInfo.size*comparisonInfo.forceCollideMultipleSmall
        ));

    // update state on every frame
    simulation.on("tick", () => {
      setAnimatedNodes([...simulation.nodes()]);
    });

    // copy nodes into simulation
    simulation.nodes([...data]);
    // slow down with a small alpha
    simulation.alpha(0.1).restart();

    // stop simulation on unmount
    return () => simulation.stop();
  }, [data, width, scatter, verticalOrientation]);


  // const prepData = (subagg, agg) => {
  //   let dataForChart = Object.keys(catInitials).map(category => {
  //     const catObject = {...subagg[category][0]}
  //     return catObject;
  //   });

  //   let cumSum = 0;
  //   for (let i=0; i< dataForChart.length; i++) {
  //     dataForChart[i].start = cumSum;
  //     dataForChart[i].end = cumSum + dataForChart[i]["Score"];
  //     cumSum += dataForChart[i]["Score"];
  //   }
    
  //   const scoresExtent = extent([...dataForChart.map(cat => cat.start),...dataForChart.map(cat => cat.end)])
  //   const scoresPosMax = max([Math.abs(scoresExtent[1]),0])
  //   const scoresNegMax = max([Math.abs(scoresExtent[0]),0])

  //   return {
  //     components: dataForChart,
  //     aggregate: dataForChart[dataForChart.length-1].end,
  //     scoresExtent: scoresExtent,
  //     scoresPosMax: scoresPosMax,
  //     scoresNegMax: scoresNegMax
  //   };
  // }

  // const dataForChart = prepData(subagg,agg);

  // console.log(dataForChart)

  // const scaleX = scaleBand()
  //   .domain(range(0,dataForChart.components.length + 1))
  //   .range([0, 80*(dataForChart.components.length + 1)])
  //   .padding(inBetweenPadding);
  
  const scaleX = (isScatter) => isScatter ? scaleXScatter : scaleXBuckets;

  const scaleXScatter = scaleLinear()
    .domain(extent(Object.values(countryProfiles).map(d => +d[categoryScoreKey])))
    .range([1.5*comparisonInfo.paddingSides, width-comparisonInfo.paddingSides]);


  const scaleXBuckets = (d) => {
    if (verticalOrientation)
     return width/2;
    else return scaleLinear()
      .domain([-2,2])
      .range([0, width])(d);
  };

  const scaleY = (isScatter) => isScatter ? scaleYScatter : scaleYBuckets

  const scaleYScatter = scaleLinear()
    .domain(
      (() => {
        const [confScoreMin, confScoreMax] = extent(Object.values(countryProfiles).map(d => +d[categoryConfidenceKey]));
        const paddingDistance = Math.abs(confScoreMax - confScoreMin)*.3;
        return [confScoreMin - paddingDistance, confScoreMax + paddingDistance]
      })()
    )
    .range([width-comparisonInfo.paddingSides,2*comparisonInfo.paddingSides])

  const scaleYBuckets = (d) => {
    if (verticalOrientation)
     return scaleLinear()
      .domain([-2,2])
      .range([0, comparisonInfo.fixedHeight(verticalOrientation)])(d)
    else return comparisonInfo.fixedHeight(verticalOrientation)/2;
  }

  // const scaleXBuckets = scaleLinear()
  //   .domain([-2,2])
  //   .range([0, width]);
  // const scaleYBuckets = (d) => comparisonInfo.fixedHeight(verticalOrientation)/2

  const [xScatterStart, xScatterEnd] = scaleXScatter.range();
  const [yScatterStart, yScatterEnd] = scaleYScatter.range();
  const xTicks = scaleXScatter.ticks();
  const yTicks = scaleYScatter.ticks();

  

  return (
    <div style={{display:"block"}} ref={containerRef} >


    <Grid>
      <Grid.Row columns={2} stackable>
        <Grid.Column style={{textAlign:"left"}}>
          <Popup 
            content='Save chart as SVG' 
            trigger={
              <Icon 
                onClick={() => saveSvg(chartRef.current,"categoryChart.svg")} 
                className={'downloadIcon'}
                // size="medium"
                name="cloud download"
              />
            } 
          />
        </Grid.Column>
        <Grid.Column style={{textAlign:"right"}}>
          <Checkbox
            slider
            checked={scatter}
            onChange={() => setScatter(!scatter)}
            label="Show as Scatterplot"
          />
        </Grid.Column>
      </Grid.Row>
      </Grid>
      <Grid className={"comparisonChartGridContainer"}>
      <Grid.Row className={"comparisonChartGrid"}>
        <svg  width={"100%"} height={scatter ? width : comparisonInfo.fixedHeight(verticalOrientation)} ref={chartRef}>
        <g className="countryComparisonChart">
          <clipPath id={"backgroundExtent"+categoryId}>
            <rect 
              x={0}
              y={0}
              width={width}
              height={scatter ? width : comparisonInfo.fixedHeight(verticalOrientation)}
              rx={scatter ? 0 : comparisonInfo.r}
              ry={scatter ? 0 : comparisonInfo.r}
            />
          </clipPath>
          {/* Negative Score background */}
          <rect 
            x={0}
            y={0}
            width={verticalOrientation ? width : width/2}
            height={scatter 
              ? width 
              : verticalOrientation
                ? comparisonInfo.fixedHeight(verticalOrientation)/2
                : comparisonInfo.fixedHeight(verticalOrientation)
              }
            fill={colors.negative}
            opacity={comparisonInfo.opacity}
            clipPath={"url(#backgroundExtent"+categoryId+")"}
          />
          
          
          {/* Positive Score background */}
          <rect 
            x={verticalOrientation ? 0 : width/2}
            y={verticalOrientation ? comparisonInfo.fixedHeight(verticalOrientation)/2 : 0}
            width={verticalOrientation ? width : width/2}
            height={scatter 
              ? width 
              : verticalOrientation
                ? comparisonInfo.fixedHeight(verticalOrientation)/2
                : comparisonInfo.fixedHeight(verticalOrientation)
            }
            fill={colors.positive}
            opacity={comparisonInfo.opacity}
            clipPath={"url(#backgroundExtent"+categoryId+")"}
          />

          {/* Confused Score background */}
          <rect 
            x={scatter 
                ? 0
                : verticalOrientation
                  ? 0
                  : scaleXBuckets((comparisonInfo.negativeXVal+comparisonInfo.neutralXVal)/2)
              }
            y={scatter
                ? (category === "overall" 
                    ? scaleYScatter(medianConfidence)
                    : scaleYScatter(0.5)
                  )
                : verticalOrientation
                  ? comparisonInfo.fixedHeight(verticalOrientation)/3
                  : 0
              }
            width={
              scatter
              ? width
              : verticalOrientation
                ? width
                : (
                    scaleXBuckets((comparisonInfo.positiveXVal+comparisonInfo.neutralXVal)/2)
                    - scaleXBuckets((comparisonInfo.negativeXVal+comparisonInfo.neutralXVal)/2)
                  )
            }
            height={scatter 
              ? width
              : verticalOrientation
                ? comparisonInfo.fixedHeight(verticalOrientation)/3
                : comparisonInfo.fixedHeight(verticalOrientation)
            }
            fill={colors.neutral}
            // opacity={comparisonInfo.opacity}
            clipPath={"url(#backgroundExtent"+categoryId+")"}
          />
          {
            verticalOrientation === true && scatter === false
            ? <g>
                <text
                  x={comparisonInfo.paddingSides/2}
                  y={comparisonInfo.paddingSides/2}  
                  textAnchor={"start"}
                >
                  {range[0]}
                </text>
                <text
                  x={comparisonInfo.paddingSides/2}
                  y={comparisonInfo.fixedHeight(verticalOrientation)*2/3 + comparisonInfo.paddingSides/2}   
                  textAnchor={"start"}  
                >
                  {range[1]}
                </text>
                <text
                  x={comparisonInfo.paddingSides/2}
                  y={comparisonInfo.fixedHeight(verticalOrientation)/3 + comparisonInfo.paddingSides/2} 
                  textAnchor={"start"}
                >
                  Confused
                </text>
              </g>
            : null
          }
          {
            scatter
            ? <g>

                {/* X-axis Ticks */}
                <g className="xTicks">
                  {xTicks.map((t, i) => {
                    const x = scaleXScatter(t);
                    return (
                      <React.Fragment key={i}>
                        <line 
                          x1={x} 
                          x2={x} 
                          // y1={yScatterEnd-comparisonInfo.paddingSides/2} 
                          // y2={yScatterEnd-comparisonInfo.paddingSides/2 - 5} 
                          y1={0}
                          y2={width}
                          stroke={comparisonInfo.gridColor}/>
                        <text
                          x={x}
                          y={yScatterEnd - comparisonInfo.paddingSides/2 - 20}
                          textAnchor="middle"
                          fontSize={10}
                          fill={comparisonInfo.axesColor}
                        >
                          {t}
                        </text>
                      </React.Fragment>
                    );
                  })}
                </g>

                {/* Y-axis Ticks */}
                <g className="yTicks">
                  {yTicks.map((t, i) => {
                    const y = scaleYScatter(t);
                    return (
                      <React.Fragment key={i}>
                        <line 
                          // x1={xScatterStart} 
                          // x2={xScatterStart - 5} 
                          x1={0}
                          x2={width}
                          y1={y} 
                          y2={y} 
                          stroke={comparisonInfo.gridColor}/>
                        <text
                          x={xScatterStart - 20}
                          y={y}
                          textAnchor="middle"
                          fontSize={10}
                          fill={comparisonInfo.axesColor}
                        >
                          {t}
                        </text>
                      </React.Fragment>
                    );
                  })}
                </g>


                {/* X-axis */}
                {/* <line 
                  // x1={xScatterStart} 
                  // x2={xScatterEnd} 
                  x1={0}
                  x2={width}
                  y1={yScatterEnd-comparisonInfo.paddingSides/2} 
                  y2={yScatterEnd-comparisonInfo.paddingSides/2} 
                  stroke={comparisonInfo.axesColor} /> */}
                {/* Y-axis */}
                {/* <line 
                  x1={xScatterStart} 
                  x2={xScatterStart} 
                  // y1={yScatterEnd-comparisonInfo.paddingSides/2} 
                  // y2={yScatterStart} 
                  y1={0}
                  y2={width}
                  stroke={comparisonInfo.axesColor} /> */}
                <text
                  x={width/2-comparisonInfo.paddingSides/2}
                  y={comparisonInfo.paddingSides/2}  
                  textAnchor={"end"}
                >
                  ← {range[0]}
                </text>
                <text
                  x={width/2+comparisonInfo.paddingSides/2}
                  y={comparisonInfo.paddingSides/2}   
                  textAnchor={"start"}  
                >
                  {range[1]} →
                </text>
                <text
                  x={comparisonInfo.paddingSides/2}
                  y={(xScatterStart+xScatterEnd) / 2 - comparisonInfo.paddingSides/2} 
                  textAnchor={"end"}   
                  transform={"rotate(-90,"+comparisonInfo.paddingSides+","+(xScatterStart+xScatterEnd) / 2 + comparisonInfo.paddingSides/2+")"}
                >
                  ← Confused
                </text>


              </g>
            : null
          }
          
        
          {
            animatedNodes.map((country,i) => {
              // console.log(country)
              return <g>

                <image 
                  href={iconsPathPrefix+"flaground/"+country["Country"].replace(" ","_")+"_96.png"} 
                  height={comparisonInfo.size}
                  width={comparisonInfo.size}
                  x={country.x} 
                  y={country.y-comparisonInfo.size/2}
                  className={"flag"}
                />
                {
                  width > comparisonInfo.widthCutOffForLabels && scatter === false
                  ? <text
                      // x={country.x+comparisonInfo.size/2}
                      x={
                        country.x+(2*comparisonInfo.paddingSides) > width 
                        ? country.x+comparisonInfo.size
                        : country.x-(2*comparisonInfo.paddingSides) < 0 ? country.x : country.x+comparisonInfo.size/2
                      }
                      y={country.y-comparisonInfo.size/2-5}
                      fontSize={comparisonInfo.fontSize}
                      textAnchor={
                        country.x+(2*comparisonInfo.paddingSides) > width 
                        ? "end"
                        : country.x-(2*comparisonInfo.paddingSides) < 0 ? "start" : "middle"
                      }
                    >
                      {country["Country"]}
                    </text>
                  : null
                }
                
              </g>
            })
          }
        </g>
      </svg>
    </Grid.Row>
    <Grid.Row columns={3} className={"comparisonChartGrid"}>
      <Grid.Column style={{textAlign:"center"}}>
      {/* Exclusionary or less transparent */}
      {scatter || verticalOrientation ? "" : range[0]}
      </Grid.Column>
      <Grid.Column style={{textAlign:"center"}}>
      {/* Exclusionary or less transparent */}
      {scatter || verticalOrientation ? "" : "Confused"}
      </Grid.Column>
      <Grid.Column style={{textAlign:"center"}}>
      {/* Open and accessible */}
      {scatter || verticalOrientation ? "" : range[1]}
      </Grid.Column>
    </Grid.Row>
    </Grid>
    </div>
  )

}

export default CountryComparisonChart;