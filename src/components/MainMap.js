import React, { useState, useRef, useEffect } from 'react';
import MapChart from './MapChart';
import { paddings, colors, hexCatTextLabels } from '../helpers/constants';
import { getGoodOrBad } from '../helpers/getGoodOrBad';
import { saveSvg } from '../helpers/saveSvg';
import BigHexComponent from './BigHexComponent';
import BigHexModal from './BigHexModal';
import { Button, Icon, Container, Popup } from 'semantic-ui-react';
import CardShareWidget from './CardShareWidget';
import { useTranslation } from 'react-i18next';
import { renderLanguageOptions } from '../helpers/renderLanguageOptions';
import { numCats } from '../helpers/datasets';

function MainMap(props) {

  const { width, height, data, downloadable, sharable, pointToTranslations } = props;
  const { gridMax, countryData, countryCodesArray, blanks, 
    categoryScoresExtent, isoToCountryLookup, countryProfiles } = data;
  const padding = paddings.mainMap;
  const hexWidth = (width-padding*2)/(gridMax.x+0.5);
  const hexHeight = (hexWidth) * 2/ Math.sqrt(3);
  const [highlightCountry,setHighlightCountry] = useState("");
  const [hoverCountry,setHoverCountry] = useState("");
  const [expandCat, setExpandCat] = useState("");


  const labelsRef = useRef([]);
  const [labelWidths, setLabelWidths] = useState([]);

  const mapRef= useRef();

  const { t, i18n } = useTranslation();
  

  useEffect(() => {
    // console.log("Hello")
    const labelBBoxes = [];
    for (let i = 0; i < numCats; i++) {
      labelBBoxes.push(
        labelsRef.current[i] 
          ? labelsRef.current[i].getBBox() 
          : {width:0,height:0}
      ) 
    }
    setLabelWidths(labelBBoxes.map(bbox => bbox.width+hexCatTextLabels.r*2))
  }, [hoverCountry, numCats])
    

  // console.log(isoToCountryLookup)

  const selectHoverCountry = (iso) => {
    if (hoverCountry === "") setHoverCountry(iso)
    if (hoverCountry !== iso) setHoverCountry(iso)
    else setHoverCountry("")
  }

  const selectHighlightCountry = (iso) => {
    // console.log("clicking on "+iso)
    if (highlightCountry === "") setHighlightCountry(iso)
    if (highlightCountry !== iso) setHighlightCountry(iso)
    else setHighlightCountry("")
  }

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
      <table cellspacing="0" cellpadding="0" style={{border: "none"}}>
        <tr  style={{border: "none"}}>
          <td  style={{border: "none"}}>
          {
            downloadable
            ? <div style={{display:"inline"}}>

              <Popup 
                content='Save hex map as SVG' 
                trigger={
                  <Icon 
                    onClick={() => saveSvg(mapRef.current,"hexMap.svg")} 
                    className={'downloadIcon'}
                    // size="medium"
                    name="cloud download"
                  />
                } 
              /><br/>
              </div>
            : <></>
          }
          </td>
          <td  style={{border: "none"}}>

          {
            sharable
            ? <CardShareWidget shareRoute={"/share/hexmap"}/>
            : <></>
          }
          </td>
          <td style={{border: "none",textAlign:"left"}}>
            {
              pointToTranslations
              ? <div>The visualisation below is also availble in {renderLanguageOptions(i18n,t,'/')}.</div>
              : <></>
            }
          </td>
        </tr>
      </table>
      <div className={"hexGridHolder"}>
      <svg className="hexGrid" width={width} height={height} ref={mapRef}>
        {/* Placeholders to calculate label width */}
        {
          countryData[countryCodesArray[0].iso3].subagg.map((category,i) => {
            return <text
              x={0}
              y={10000}
              fontSize={"0.8em"}
              className={"hexChartElement"}
              ref={el => labelsRef.current[i] = el}
            >
              {t(category["Score Type"])}
            </text>
          })
        }
        {
          blanks.map((currentBlank,i) => {
            const {x,y,hexPointsString} = calcPos(currentBlank.grid_pos_x,currentBlank.grid_pos_y,hexWidth,hexHeight);
            return <g key={"blankHex"+i}>
              <polygon 
                points={hexPointsString}
                fill={"#f4f4f4"} 
                stroke={colors.border} 
                strokeWidth="1" 
              />
            </g>
          })
        }
        {
          countryCodesArray.map(country => {
            const {x,y,hexPointsString} = calcPos(country.grid_pos_x,country.grid_pos_y,hexWidth,hexHeight);
            // console.log(country.grid_pos_x)
            return <g key={country.iso3}>
              <clipPath id={"hexMaxExtent"+country.iso3}>
                <polygon 
                  points={hexPointsString}/>
              </clipPath>
              <polygon 
                points={hexPointsString}
                stroke={hoverCountry === country.iso3 
                  ? getGoodOrBad(countryProfiles[country.iso3].confidence_rank) === "bad"
                    ? colors.border
                    :  getGoodOrBad(countryProfiles[country.iso3].overall_rank) === "good"
                        ? colors.positive
                        : colors.negative 
                  : colors.border} 
                strokeWidth={hoverCountry === country.iso3 ? 4 : 2} 
                // fill={hoverCountry === country.iso3 ? colors.highlight : "white"} 
                // fill={"white"} 
                fill={"white"} 
                opacity={hoverCountry === country.iso3 ? 0.4 : 1}
                onClick={() => selectHighlightCountry(country.iso3)}
                onMouseOver={() => selectHoverCountry(country.iso3)}
                onMouseOut={() => selectHoverCountry(country.iso3)}
                clipPath={"url(#hexMaxExtent"+country.iso3+")"}
              />
              <text 
                x={x+hexWidth/2}
                y={y+hexHeight*1/4}
                fontSize={"0.8em"}
                textAnchor="middle"
                onClick={() => selectHighlightCountry(country.iso3)}
              >
                {t(country.country_name)}
              </text>
              <g className="mapChartHolder" transform={"translate("+x+","+y+")"}>
                <MapChart
                  country={country.iso3}
                  width={hexWidth}
                  height={hexHeight/2}
                  multiplier={1}
                  data={countryData[country.iso3]}
                  scoresExtent={categoryScoresExtent}
                  selectHighlightCountry={selectHighlightCountry}
                  expandCat={expandCat}
                  setExpandCat={setExpandCat}
                  hoverCountry={hoverCountry}
                  selectHoverCountry={selectHoverCountry}
                  edge={country.grid_pos_x === 1 ? "left" : (country.grid_pos_x === gridMax.x ? "right" : false)}
                  labelOnly={false}
                  labelWidths={labelWidths}
                />
              </g>
            </g>
            
          })
        }
        {
          countryCodesArray.map(country => {
            const {x,y,hexPointsString} = calcPos(country.grid_pos_x,country.grid_pos_y,hexWidth,hexHeight);
            // console.log(country.grid_pos_x)
            return <g key={country.iso3}>
              <g className="mapChartHolder" transform={"translate("+x+","+y+")"}>
                <MapChart
                  country={country.iso3}
                  width={hexWidth}
                  height={hexHeight/2}
                  multiplier={1}
                  data={countryData[country.iso3]}
                  scoresExtent={categoryScoresExtent}
                  selectHighlightCountry={selectHighlightCountry}
                  expandCat={expandCat}
                  setExpandCat={setExpandCat}
                  hoverCountry={hoverCountry}
                  selectHoverCountry={selectHoverCountry}
                  highlightCountry={highlightCountry}
                  edge={country.grid_pos_x === 1 ? "left" : (country.grid_pos_x === gridMax.x ? "right" : false)}
                  labelOnly={true}
                  labelWidths={labelWidths}
                />
              </g>
            </g>
          })
        }

        {
          highlightCountry !== ""
          ? <BigHexModal
                width={200}
                height={200}
                multiplier={2}
                data={countryData[highlightCountry]}
                scoresExtent={categoryScoresExtent}
                dy={0}
                countryInfo={isoToCountryLookup[highlightCountry]}
                selectHighlightCountry={selectHighlightCountry}
                noCountryLabel={false}
                iconsPathPrefix={"icons/flaground/"}
                open={highlightCountry !== ""}
                // countryRank={countryProfiles[highlightCountry].overall_rank}
                countryRank={
                  countryProfiles[highlightCountry].overall_confidence_rank === "strong" ? countryProfiles[highlightCountry].overall_rank : "Confused"
                }
                country={countryProfiles[highlightCountry].country}
                highlightCountry={highlightCountry}
                labelWidths={labelWidths}
            />
          // ? <g>
          //     <rect
          //       width={width}
          //       height={height}
          //       fill={"rgba(255,255,255,0.6)"}
          //       onClick={() => selectHighlightCountry(highlightCountry)}
          //     />
          //     <BigHexComponent
          //       width={200}
          //       height={200}
          //       multiplier={2}
          //       data={countryData[highlightCountry]}
          //       scoresExtent={categoryScoresExtent}
          //       dx={width/2}
          //       dy={100}
          //       countryInfo={isoToCountryLookup[highlightCountry]}
          //       selectHighlightCountry={selectHighlightCountry}
          //       noCountryLabel={false}
          //       iconsPathPrefix={"icons/flaground/"}
          //     />
          //     <a href={"/scorecard/"+highlightCountry}>
          //     <rect
          //       x={width*.25}
          //       y={height*.63}
          //       rx={hexCatTextLabels.r}
          //       ry={hexCatTextLabels.r}
          //       stroke={colors.border}
          //       fill={"white"}
          //       width={width/2}
          //       height={120}
          //     />
          //     </a>
          //     <a href={"/scorecard/"+highlightCountry}>
          //     <text
          //       x={
          //         width*.5
          //       }
          //       y={height*.63+40}
          //       textAnchor={"middle" }
          //       fontSize={(1.8)+"em"}
          //       fill={
          //         countryProfiles[highlightCountry].overall_rank === "Open and Accessible"
          //         ? colors.positive
          //         : colors.negative
          //       }
          //       className={"hexChartElement"}
          //       // onMouseOver={() => scoreMouseOver(category["Score Type"])}
          //       // onMouseOut={() => scoreMouseOut(category["Score Type"])}
          //     >
          //       Overall score: {countryProfiles[highlightCountry].overall_rank}
          //     </text>
          //     </a>
          //     <a href={"lighthouse-vaccine/scorecard/"+highlightCountry}>
          //       <text
          //         x={
          //           width*.5
          //         }
          //         y={height*.63+80}
          //         textAnchor={"middle" }
          //         fontSize={(1.2)+"em"}
          //         className={"hexChartElement"}
          //         // onMouseOver={() => scoreMouseOver(category["Score Type"])}
          //         // onMouseOut={() => scoreMouseOut(category["Score Type"])}
          //       >
          //         Click here to view scorecard for {countryProfiles[highlightCountry].country}
          //       </text>
          //     </a>
          //   </g>
          : null
        }
        
      </svg>
      </div>
    </div>
  )

}

export default MainMap;