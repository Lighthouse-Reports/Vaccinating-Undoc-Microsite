import React, { useState, useRef, useEffect } from 'react';
import { colors, getColor, getBackgroundColor, paddings, questionBar, medianBar, 
  catInitials, scoreCardCircleRadii, medianMarker, blankAnswer } from '../helpers/constants';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max } from 'd3-array';
import { Card } from 'semantic-ui-react';
import CardShareWidget from './CardShareWidget';
import { useTranslation } from 'react-i18next';

function ScorecardQuestion(props) {
  const { width, height, data, shareRoute, smallWidth } = props;
  const chartPadding = smallWidth ? 0 : paddings.mapChartBorder;
  const inBetweenPadding = paddings.mapChartInBetween;
  const lineHeight = height;
  const paddedWidth = width - chartPadding*2;
  const {score,question} = data;
  const [hoverScore, setHoverScore] = useState(null);

  // console.log(score);
  // console.log(shareRoute);


  const barWidth = paddedWidth*paddings.scoreCardQuestionBarPercentage;

  const scale = (value) => {
    return value > 0
    ? scaleLinear()
      .domain([0,question["scorePosMax"]])
      .range([0,barWidth/2])(value)
    : scaleLinear()
      .domain([0,question["scoreNegMax"]])
      .range([0,barWidth/2])(Math.abs(value))
  }

  const fillColor = getColor(+score["Score"]);
  const xStart = (width-barWidth)/2;

  const { t, i18n } = useTranslation();


  // For Tooltip
  
  // const [hoverCountry, setHoverCountry] = useState({
  //   item: null,
  //   isToolTip: false,
  // });

  // const useMousePosition = () => {
  //   const [mousePosition, setMousePosition] = useState({
  //     mouseX: null,
  //     mouseY: null,
  //   });

  //   const updateMousePosition = (ev) => {
  //     setMousePosition({ mouseX: ev.clientX, mouseY: ev.clientY });
  //   };

  //   useEffect(() => {
  //     window.addEventListener('mousemove', updateMousePosition);

  //     return () => window.removeEventListener('mousemove', updateMousePosition);
  //   }, []);

  //   return mousePosition;
  // };

  // const { mouseX, mouseY } = useMousePosition();

  const onMouseEnter = (item) => {
    // console.log("Mouse Enter", item);
    setHoverScore(item);
  };
  const onMouseLeave = (item) => {
    // console.log("Mouse Leave", item);
    setHoverScore(null);
  };

  const getScoreToUse = (answer) => {
    if (hoverScore === null) return question.answersScores[answer];
    // else if (answer !== hoverScore) return question.answersScores[answer];
    else return question.answersScores[hoverScore];
  }

  const getScoreTypeToUse = (answer) => {
    if (hoverScore === null) return answer;
    // else if (answer !== hoverScore) return answer;
    else return hoverScore;
  }

  const defaultAnswerWidth = scale(Math.abs(score["Score"]));

  const answerWidth = (answer) => {
    const returnVal = scale(question.answersScores[getScoreTypeToUse(answer)]);
    // console.log(returnVal)
    return returnVal;
  }




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
                  background: (hoverScore !== null && answer === hoverScore)
                    ? getBackgroundColor(getScoreToUse(answer))
                    : (answer === score["Answer"])
                      ? getBackgroundColor(question.answersScores[answer])
                      : "none",
                }}
                onMouseEnter={() => onMouseEnter(answer)}
                onMouseLeave={() => onMouseLeave(answer)}
              >
                {t(answer)}
              </div>
            })
        }
      </Card.Description>
      <Card.Description>
        {
          hoverScore !== score["Answer"] && hoverScore != null ? <div>{t("If the answer was "+hoverScore)}:<br/></div> : ""
        }  
        {question["answers"][getScoreTypeToUse(score["Answer"])]} <br/>
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
              + (getScoreToUse(score["Answer"]) > 0 ? barWidth/2 : barWidth/2 - answerWidth(score["Answer"]))
            }
            width={answerWidth(score["Answer"])}
            fill={getColor(getScoreToUse(score["Answer"]))}
            // fillOpacity={0.6}
            clipPath="url(#questionMaxExtent)"
            className="answerBar" />

          {/* Median Bar */}
          {/* <rect 
            x={
              xStart
              + (score["Median"] > 0 ? barWidth/2 : barWidth/2 - scale(score["Median"]))
            }
            y={medianBar.y}
            width={scale(score["Median"])}
            height={medianBar.height}
            fill={getColor(+score["Median"])}
            fillOpacity={1}
            className="answerBar" /> */}

          {/* Axis Labels */}
          <text 
            x={xStart} 
            y={(questionBar.y + paddings.scoreCardQuestionLabelPadding)} 
            textAnchor={"start"} 
            fontSize={questionBar.fontSize}>
            {t(question["Range Min"])}
          </text>
          <text 
            x={xStart+barWidth} 
            y={(questionBar.y + paddings.scoreCardQuestionLabelPadding)} 
            fontSize={questionBar.fontSize} 
            textAnchor={"end"}>
            {t(question["Range Max"])}
          </text>

          {/* Median Marker */}
          <rect 
            x={
              xStart
              + (score["Median"] > 0 
                  ? barWidth/2 + scale(score["Median"]) 
                  : barWidth/2 - scale(score["Median"]))
              - scoreCardCircleRadii.median/2
            }
            y={questionBar.y-scoreCardCircleRadii.median}
            rx={scoreCardCircleRadii.median/2}
            ry={scoreCardCircleRadii.median/2}
            width={scoreCardCircleRadii.median}
            height={questionBar.height+2*scoreCardCircleRadii.median}
            // fill={getColor(+score["Median"])}
            fill={"#FFF"}
            stroke={getColor(+score["Median"])}
            // fillOpacity={questionBar.fillOpacity}
            className="answerBar" />


          {/* Circle Markers */}
          {
            ["Score"].map(scoreType => {
                const widthToUse = scoreType === 'Median'
                  ? scale(score["Median"])
                  : answerWidth(score["Answer"])
                return <circle
                  r={scoreType === "Median" ? scoreCardCircleRadii.median : scoreCardCircleRadii.answer}
                  cx={
                    scoreType === "Median" 
                    ? xStart + (score[scoreType] > 0 ? barWidth/2 + widthToUse : barWidth/2 - widthToUse)
                    : (
                        xStart
                        // + (score[scoreType] > 0 ? barWidth/2 + widthToUse : barWidth/2 - widthToUse)
                        + (
                            getScoreToUse(score["Answer"]) > 0 
                            ? barWidth/2 + answerWidth(score["Answer"]) 
                            : barWidth/2 - answerWidth(score["Answer"])
                          )
                      )
                  }
                  cy={
                    questionBar.y 
                    + (scoreType === "Median" 
                      ? (questionBar.height + medianBar.height*.5) 
                      : (-scoreCardCircleRadii.answer/2))
                  }
                  fill="#fff"
                  strokeWidth="1"
                  stroke={scoreType === "Median" ? getColor(+score[scoreType]) : getColor(getScoreToUse(score["Answer"]))}
                />
              }
            )
          }

          {/* Median Marker */}
          {/* <rect 
            x={
              xStart
              + (score["Median"] > 0 
                ? barWidth/2 + scale(score["Median"]) - medianMarker.width/2 
                : barWidth/2 - scale(score["Median"]) - medianMarker.width/2)
            }
            rx={medianBar.height/2}
            y={medianBar.y+medianBar.height/2-medianMarker.height/2 + paddings.scoreCardMediaLabelPadding}
            width={medianMarker.width}
            height={medianBar.height*2}
            fill={"white"}
            fillOpacity={1}
            stroke={getColor(+score["Median"])}
            className="answerBar" /> */}
          <text 
            x={
              xStart
              + (score["Median"] > 0 
                ? barWidth/2 + scale(score["Median"]) 
                : barWidth/2 - scale(score["Median"]))
            }
            y={medianBar.y + medianBar.height + paddings.scoreCardMediaLabelPadding}
            fill={getColor(+score["Median"])}
            fontSize={medianMarker.fontSize}
            textAnchor={"middle"}
            className="answerBar" >{t("Median")}</text>


          {/* Country Score Marker */}
          {
            // hoverScore === null || score["Answer"] === hoverScore
            // ? <text 
             <text 
                x={
                  xStart
                  // + (
                  //     getScoreToUse(score["Answer"]) > 0 
                  //     ? barWidth/2 + answerWidth(score["Answer"]) 
                  //     : barWidth/2 - answerWidth(score["Answer"])
                  //   )
                  + (
                      getScoreToUse(score["Answer"]) > 0 
                      ? (scale(getScoreToUse(score["Answer"])) >= barWidth/2)
                        ? barWidth/2 + scale(getScoreToUse(score["Answer"])) + scoreCardCircleRadii.answer*2 
                        : barWidth/2 + scale(getScoreToUse(score["Answer"])) 
                      : (scale(getScoreToUse(score["Answer"])) >= barWidth/2)
                        ? barWidth/2 - scale(getScoreToUse(score["Answer"])) - scoreCardCircleRadii.answer*2 
                        : barWidth/2 - scale(getScoreToUse(score["Answer"]))
                    )
                }
                y={questionBar.y - 2*paddings.scoreCardMediaLabelPadding}
                fill={getColor(+getScoreToUse(score["Answer"]))}
                fontSize={medianMarker.fontSize}
                textAnchor={
                  getScoreToUse(score["Answer"]) > 0 && (scale(getScoreToUse(score["Answer"])) >= barWidth/2)
                  ? "end" 
                  : getScoreToUse(score["Answer"]) < 0 && (scale(getScoreToUse(score["Answer"])) >= barWidth/2) 
                    ? "start" 
                    : "middle"
                }
                className="answerBar" >
                  {
                    hoverScore === null || score["Answer"] === hoverScore
                    ? t(score["Country"]
                      + (score["Country"][score["Country"].length - 1] === 's' ? "' " : "'s ")
                      + "Score")
                    : t("If the answer was " + hoverScore)
                  }
                </text>
              // : null
          }
          
              
        </g>
      </svg>

      </Card.Content>

      <Card.Content extra>
        <CardShareWidget shareRoute={shareRoute}/>
      </Card.Content>
    </Card>
  )

}

export default ScorecardQuestion;