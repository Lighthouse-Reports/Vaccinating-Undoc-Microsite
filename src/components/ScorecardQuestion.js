import React, { useState, useRef, useEffect } from 'react';
import { colors, getColor, getBackgroundColor, paddings, questionBar, medianBar, 
  catInitials, scoreCardCircleRadii, medianMarker, blankAnswer } from '../helpers/constants';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max } from 'd3-array';
import { Card } from 'semantic-ui-react';

function ScorecardQuestion(props) {
  const { width, height, data, scoresExtent } = props;
  const chartPadding = paddings.mapChartBorder;
  const inBetweenPadding = paddings.mapChartInBetween;
  const lineHeight = height;
  const paddedWidth = width - chartPadding*2;
  const {score,question} = data;

  console.log(score,question);

  const barWidth = paddedWidth*paddings.scoreCardQuestionBarPercentage;

  const scale = (value) => {
    return value > 0
    ? scaleLinear()
      .domain([0,question["scoreNegMax"]])
      .range([0,barWidth/2])(value)
    : scaleLinear()
        .domain([0,question["scorePosMax"]])
        .range([0,barWidth/2])(value)
  }
  const answerWidth = scale(Math.abs(score["Score"])) === 0 
    ? 3 
    : scale(Math.abs(score["Score"]));
  const fillColor = getColor(+score["Score"]);
  const xStart = (width-barWidth)/2;


  // For Tooltip
  
  const [hoverCountry, setHoverCountry] = useState({
    item: null,
    isToolTip: false,
  });

  const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({
      mouseX: null,
      mouseY: null,
    });

    const updateMousePosition = (ev) => {
      setMousePosition({ mouseX: ev.clientX, mouseY: ev.clientY });
    };

    useEffect(() => {
      window.addEventListener('mousemove', updateMousePosition);

      return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return mousePosition;
  };

  const { mouseX, mouseY } = useMousePosition();

  const onMouseEnter = (item) => {
    // setTooltip({item:item});
    setHoverCountry({ item: item, isToolTip: true });
  };
  const onMouseLeave = (item) => {
    // setTooltip(false);
    setHoverCountry({ item: item, isToolTip: false });
  };


  const Tooltip = ({ country }) => {
    const tooltipWidth = 100;
    const tooltipHeight = tooltipWidth;

    return (null
      // <foreignObject
      //   style={{
      //     pointerEvents: 'none',
      //   }}
      //   x={
      //     mouseX + tooltipWidth < size.x + width - tooltipWidth
      //       ? mouseX + 20 - size.x
      //       : mouseX - 10 - size.x - tooltipWidth
      //   }
      //   // y={ mouseY + 10 + 0.6*tooltipHeight < size.y + height
      //   //   ? mouseY - size.y
      //   //   : mouseY - size.y - (0.9*tooltipHeight)
      //   // }
      //   y={0}
      //   width={tooltipWidth}
      //   height={tooltipHeight}
      // >
      //   <div
      //     className="tooltip"
      //     style={{
      //       backgroundColor: 'rgb(80,128,94)',
      //       border: '1px solid',
      //       padding: '5px 5px 5px 5px',
      //       textAlign: 'left',
      //       borderColor: '#fff',
      //     }}
      //   >
      //     {country.item && country.item.index ? (
      //       <div>
      //         {country.item.name}
      //         <br />
      //         Rank: #{country.item.rank}
      //       </div>
      //     ) : null}
      //   </div>
      // </foreignObject>
    );
  };



  return (
    <Card className={"scoreCard"}>
      <Card.Content>
      <div className={"scoreCardContent"}>
      <Card.Header>
        {question["Question Short"]}
      </Card.Header>
      <Card.Description className={"answerGrid"}>
        {
          Object.keys(question.answers)
            .filter(answer => question.answers[answer] !== blankAnswer)
            .map(answer => {
              return <div 
                className={
                  "answer "
                  + (
                    answer === score["Answer"] 
                      ? "correctAnswer"
                      : "wrongAnswer"
                    )
                  }
                style={{
                  color: getColor(question.answersScores[answer]),
                  background: answer === score["Answer"]
                    ? getBackgroundColor(question.answersScores[answer])
                    : "none",
                }}
              >
                {answer}
              </div>
            })
        }
      </Card.Description>
      <Card.Description>
        {question["answers"][score["Answer"]]} <br/>
      </Card.Description>
      </div>
      <svg  width={width} height={height}>
        <g className="questionChart">
          {/* Outlines */}
          <clipPath id="questionMaxExtent">
            <rect 
              {...questionBar}
              x={xStart}
              width={barWidth}/>
          </clipPath>
          <rect 
            {...questionBar}
            x={xStart}
            width={barWidth}
            className="questionBar"/>

          {/* Answer Bar */}
          <rect 
            {...questionBar}
            rx={0}
            ry={0}
            x={
              xStart
              + (score["Score"] > 0 ? barWidth/2 : barWidth/2 - answerWidth)
            }
            width={answerWidth}
            fill={fillColor}
            fillOpacity={0.6}
            clipPath="url(#questionMaxExtent)"
            className="answerBar" />

          
          <rect 
            x={
              xStart
              + (score["Median"] > 0 ? barWidth/2 : barWidth/2 - answerWidth)
            }
            y={medianBar.y}
            width={answerWidth}
            height={medianBar.height}
            fill={getColor(+score["Median"])}
            fillOpacity={1}
            className="answerBar" />

          {/* Axis Labels */}
          <text 
            x={xStart} 
            y={(questionBar.y + paddings.scoreCardQuestionLabelPadding)} 
            textAnchor={"start"} 
            fontSize={questionBar.fontSize}>
            {question["Range Min"]}
          </text>
          <text 
            x={xStart+barWidth} 
            y={(questionBar.y + paddings.scoreCardQuestionLabelPadding)} 
            fontSize={questionBar.fontSize} 
            textAnchor={"end"}>
            {question["Range Max"]}
          </text>



          {/* Circle Markers */}
          {
            ["Median","Score"].map(scoreType => {
                return <circle
                  r={scoreType === "Median" ? scoreCardCircleRadii.median : scoreCardCircleRadii.answer}
                  cx={
                    xStart
                    + (score[scoreType] > 0 ? barWidth/2 + answerWidth : barWidth/2 - answerWidth)
                  }
                  cy={
                    questionBar.y 
                    + (scoreType === "Median" 
                      ? (questionBar.height + medianBar.height*.5) 
                      : (-scoreCardCircleRadii.answer/2))
                  }
                  fill="#fff"
                  strokeWidth="1"
                  stroke={getColor(+score[scoreType])}
                />
              }
            )
          }

          {/* Median Marker */}
          {/* <rect 
            x={
              xStart
              + (score["Median"] > 0 
                ? barWidth/2 + answerWidth - medianMarker.width/2 
                : barWidth/2 - answerWidth - medianMarker.width/2)
            }
            rx={medianBar.height/2}
            y={medianBar.y+medianBar.height/2-medianMarker.height/2}
            width={medianMarker.width}
            height={medianBar.height*2}
            fill={"white"}
            fillOpacity={1}
            stroke={getColor(+score["Median"])}
            className="answerBar" />
          <text 
            x={
              xStart
              + (score["Median"] > 0 
                ? barWidth/2 + answerWidth 
                : barWidth/2 - answerWidth)
            }
            y={medianBar.y + medianBar.height}
            fill={getColor(+score["Median"])}
            fontSize={medianMarker.fontSize}
            textAnchor={"middle"}
            className="answerBar" >Median</text> */}
              
        </g>
      </svg>

      <div style={{position:"absolute",bottom:10,fontSize:"0.8em"}}>{question['Score Type']}</div>
      </Card.Content>
    </Card>
  )

}

export default ScorecardQuestion;