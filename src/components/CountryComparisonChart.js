import React, { useState, useRef, useEffect } from 'react';
import { colors, paddings, catInitials, comparisonInfo } from '../helpers/constants';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max, extent } from 'd3-array';
import { forceSimulation, forceManyBody, forceX, forceY, 
  forceCollide } from 'd3-force';
import { Grid, Popup, Icon } from 'semantic-ui-react';
import { saveSvg } from '../helpers/saveSvg';

function CountryComparisonChart(props) {
  const { data } = props;

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  // const { subagg, agg } = data;
  const chartPadding = paddings.waterfallChartBorder;
  const inBetweenPadding = paddings.waterfallChartInBetween;
  const lineHeight = comparisonInfo.fixedHeight;
  const paddedWidth = width - chartPadding*2;
  // const charge = -3;

  const [animatedNodes, setAnimatedNodes] = useState([]);
  // console.log(data,extent(data.map(d => d.Score)));

  const containerRef = useRef();
  const chartRef = useRef();
  // console.log(width,height);

  // This function calculates width and height of the list
  const getContainerSize = () => {
    const newWidth = containerRef.current.clientWidth;
    setWidth(newWidth);

    const newHeight = containerRef.current.clientHeight;
    setHeight(newHeight);
  };

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

  useEffect(() => {
    const simulation = forceSimulation()
      .force("x", forceX(d => scaleX(d.Score >0 ? 1: -1)).strength(comparisonInfo.strength))
      .force("y", forceY(lineHeight/2).strength(comparisonInfo.strength))
      .force("charge", forceManyBody().strength(comparisonInfo.charge))
      .force('collide', forceCollide(
          width > comparisonInfo.widthCutOffForLabels 
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
    simulation.alpha(0.2).restart();

    // stop simulation on unmount
    return () => simulation.stop();
  }, [data, width, height]);


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
  

  const scaleX = scaleLinear()
    // .domain(extent(data.map(d => d.Score)))
    .domain([-2,2])
    .range([0, width-2]);

  // const scaleY = scaleBand()
  //   .domain(range(0,13))
  //   .range([0, lineHeight])
  //   .padding(inBetweenPadding);
  

  return (
    <div style={{display:"block"}} ref={containerRef}>

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
    <svg  width={"100%"} height={comparisonInfo.fixedHeight} ref={chartRef}>
      <g className="countryComparisonChart">
        <clipPath id="backgroundExtent">
          <rect 
            x={0}
            y={0}
            width={width}
            height={comparisonInfo.fixedHeight}
            rx={comparisonInfo.r}
            ry={comparisonInfo.r}
          />
        </clipPath>
        <rect 
          x={0}
          y={0}
          width={width/2}
          height={comparisonInfo.fixedHeight}
          fill={colors.negative}
          opacity={comparisonInfo.opacity}
          clipPath="url(#backgroundExtent)"
        />
        <rect 
          x={width/2}
          y={0}
          width={width/2}
          height={comparisonInfo.fixedHeight}
          fill={colors.positive}
          opacity={comparisonInfo.opacity}
          clipPath="url(#backgroundExtent)"
        />

        
      
        {
          animatedNodes.map((country,i) => {
            // console.log(data[score][country][0])
            return <g>

              <image 
                href={"icons/flaground/"+country["Country"].replace(" ","_")+"_96.png"} 
                height={comparisonInfo.size}
                width={comparisonInfo.size}
                x={country.x} 
                y={country.y}
                className={"flag"}
              />
              {
                width > comparisonInfo.widthCutOffForLabels
                ? <text
                    x={country.x+comparisonInfo.size/2}
                    y={country.y-5}
                    fontSize={comparisonInfo.fontSize}
                    textAnchor={"middle"}
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
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
        Exclusionary or less transparent
        </Grid.Column>
        <Grid.Column style={{textAlign:"right"}}>
        Open and accessible
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </div>
  )

}

export default CountryComparisonChart;