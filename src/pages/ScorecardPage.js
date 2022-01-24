
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Grid } from "semantic-ui-react";
import { data, countryFactsRetrievedOn } from '../helpers/datasets';
import {quotesNest} from '../helpers/quotes';
import {stringListConcat} from '../helpers/stringListConcat';
import { getGoodOrBad } from "../helpers/getGoodOrBad";
import { Button, Card, Image, Container, Popup } from 'semantic-ui-react'
import ScorecardQuestion from "../components/ScorecardQuestion";
import ScorecardWaterfallChart from "../components/ScorecardWaterfallChart";
import BigHexComponent from "../components/BigHexComponent";
import Quote from "../components/QuoteComponent";
import DecoratedString from "../components/DecoratedStringComponent";
import { catInitials, iconsPathPrefix, scoreCardText, hexCatTextLabels } from "../helpers/constants";
import { format } from 'd3-format';
import { randomInt } from 'd3-random';
import ScoreCardExplainer from '../components/explainers/ScoreCardExplainer'
import { useTranslation, Trans } from 'react-i18next';
import { numCats } from '../helpers/datasets';
import { numberLocales } from "../helpers/numberLocales";
import { renderLanguageOptions } from '../helpers/renderLanguageOptions';


function ScorecardPage(props) {

  const { iso, language } = props.match.params;
  const categories = Object.keys(catInitials);
  const { countryDataNestToScore, questions, isoToCountryLookup, countryData,
    categoryScoresExtent, countryProfiles } = data;

  const [highlightCat, setHighlightCat] = useState("");
  const [openExplainer, setOpenExplainer] = useState(false);

  const openCatsRemoveConfused = countryProfiles[iso].open_categories.filter(c => !countryProfiles[iso].incomplete_categories.includes(c));
  const closedCatsRemoveConfused = countryProfiles[iso].closed_categories.filter(c => !countryProfiles[iso].incomplete_categories.includes(c));

  const { t, i18n } = useTranslation();

  const labelsRef = useRef([]);
  const [labelWidths, setLabelWidths] = useState([]);



  useEffect(() => {
    const labelBBoxes = [];
    for (let i = 0; i < numCats; i++) {
      labelBBoxes.push(
        labelsRef.current[i] 
          ? labelsRef.current[i].getBBox() 
          : {width:0,height:0}
      ) 
    }
    setLabelWidths(labelBBoxes.map(bbox => bbox.width+hexCatTextLabels.r*2))
  }, [numCats,language,i18n.language])

  useEffect(() => {
    if (i18n.getLanguages().includes(language) && i18n.language !== language) {
      i18n.changeLanguage(language);
    } else if (i18n.language !== 'en') {
      i18n.changeLanguage('en');  
    }
  }, [language])

  const highlightCatMouseOver = (cat) => {
    setHighlightCat(cat)
  }

  const highlightCatMouseOut = () => {
    setHighlightCat("")  
  }

  const f = numberLocales[i18n.language].format(",.0f")

 

  const quotesAll = quotesNest[i18n.language][isoToCountryLookup[iso]["country_name"]];
  // console.log(quotesAll)

  const additionalQuotes = quotesAll && quotesAll["Uncategorised"] && quotesAll["Uncategorised"].length > 0
    ? quotesAll["Uncategorised"]
    : []

  

  const generateCardOrder = (cat) => {
    const scoreCards = countryDataNestToScore[iso][catInitials[cat].short];
    const scoreCardKeys = Object.keys(scoreCards);
    const quoteIndices = [1,3,5,7,9,11];
    // const scoreCardValues = Object.values(scoreCards);
    const quotes = quotesNest[i18n.language][isoToCountryLookup[iso]["country_name"]] 
      ? quotesNest[i18n.language][isoToCountryLookup[iso]["country_name"]][cat]
      : undefined;

    // console.log(quotes)
    let quoteSlots = Array.isArray(quotes) && quotes.length > 0 ? quoteIndices.slice(0,quotes.length) : [];
    // let randomSlot = Array.isArray(quotes) && quotes.length > 0 ? randomInt(scoreCardKeys.length)() : -1;

    let returnArray = [];

    if (quoteSlots !== []) {
      let currentScoreCardIndex = 0
      let currentQuoteIndex = 0
      for (let i = 0; i < scoreCardKeys.length + quoteSlots.length; i++) {
        if (quoteSlots.includes(i)) {
          returnArray.push({"type":"quote","item":quotes[currentQuoteIndex]})
          currentQuoteIndex++;
        } else {
          returnArray.push({"type":"question","item":scoreCardKeys[currentScoreCardIndex]});
          currentScoreCardIndex++;
        }
      }
    } else {
      return scoreCardKeys.map(k => ({"type":"question","item":k}));
    }

    return returnArray;
  }

  return (
    <Container className={'scorecardPage'} >
      {/* <Grid container className="MainContainer">
        <Grid.Item>
          
        </Grid.Item>
      </Grid> */}
      <Grid stackable centered relaxed className="MainContainer" columns={2}>
{/* 
        <Grid.Row>
          <h1 className={"scoreCardPageHead"}>{isoToCountryLookup[iso]["country_name"]}</h1>
        </Grid.Row> */}

        <Grid.Row>
          <Grid.Column tablet={7} computer={5} centered>
            <Container>
            <svg width={380} height={350}>

            {/* Placeholders to calculate label width */}
            {
              countryData[iso].subagg.map((category,i) => {
                return <text
                  x={0}
                  y={10000}
                  // y={10}
                  fontSize={"0.8em"}
                  className={"hexChartElement"}
                  ref={el => labelsRef.current[i] = el}
                >
                  {t(category["Score Type"])}
                </text>
              })
            }
            <BigHexComponent
              width={180}
              parentWidth={360}
              height={180}
              multiplier={2}
              data={countryData[iso]}
              scoresExtent={categoryScoresExtent}
              dx={140}
              dy={0}
              countryInfo={isoToCountryLookup[iso]}
              // selectHighlightCountry={selectHighlightCountry}
              noCountryLabel={false}
              noHex={false}
              iconsPathPrefix={iconsPathPrefix+"flaground/"}
              highlightCat={highlightCat}
              overall={countryProfiles[iso].overall_rank}
              labelWidths={labelWidths.map(width => width+hexCatTextLabels.r*2)}
            />
            </svg>
            </Container>
          </Grid.Column>
          <Grid.Column tablet={9} computer={11} className={"scoreCardDescription"}>
            <p>
              {/* <Trans i18nKey="Overall Blurb" overallScore={countryProfiles[iso].overall_confidence_rank === "strong" ? countryProfiles[iso].overall_rank : "Confused"}> */}
              <Trans i18nKey="Overall Blurb">
              {countryProfiles[iso].country} overall leans more towards <DecoratedString stringText={t(countryProfiles[iso].overall_confidence_rank === "strong" ? countryProfiles[iso].overall_rank : "Confused")}/>.              
              </Trans>
            </p>

            <p>
              {/* It has a <Popup flowing hoverable trigger={<span><DecoratedString stringText={countryProfiles[iso].confidence_rank + " confidence score"} stringClass={countryProfiles[iso].confidence_rank}/></span>}>Low confidence score indicates a high number of unknowns.</Popup>, meaning that the documents we analysed for the Scorecard were fairly {countryProfiles[iso].completeness_of_documents}. */}
              <Trans i18nKey="Incomplete Scores Blurb">
              It has a <Popup 
                flowing 
                hoverable 
                trigger={
                  <span>
                    <DecoratedString 
                      stringText={countryProfiles[iso].confidence_rank + " confidence score"} 
                      stringClass={countryProfiles[iso].confidence_rank}/>
                  </span>}
                >Low confidence score indicates a high number of unknowns.
              </Popup>
              , meaning that the documents we analysed for the Scorecard were fairly {countryProfiles[iso].completeness_of_documents}.
              </Trans>
              
            {
              countryProfiles[iso].incomplete_categories.length > 0
              ? <>
                <Trans i18nKey="Incomplete Cats Blurb">
                Due to incompleteness of data, it was difficult to evaluate
                </Trans>
                {stringListConcat(countryProfiles[iso].incomplete_categories, "", highlightCatMouseOver, highlightCatMouseOut, t)}.
               </>
              : ""
            }
            </p>

            <p>
            {
              openCatsRemoveConfused.length > 0
              ? <>{t("The country is more open and accessible for ")}{
                  // stringListConcat(countryProfiles[iso].open_categories, "", highlightCatMouseOver, highlightCatMouseOut)
                  stringListConcat(openCatsRemoveConfused, "", highlightCatMouseOver, highlightCatMouseOut, t)
                }</>
              : ""
            }
            {
              // countryProfiles[iso].closed_categories.length > 0
              closedCatsRemoveConfused.length > 0
              // ? <>, and more exclusionary or less transparent for {stringListConcat(countryProfiles[iso].closed_categories, "", highlightCatMouseOver, highlightCatMouseOut)}. </>
              ? <>{t(", and more exclusionary or less transparent for ")}{stringListConcat(closedCatsRemoveConfused, "", highlightCatMouseOver, highlightCatMouseOut, t)}. </>
              : ". "
            }
            </p>
            <br/>
            {/* <p>
            Overall, {countryProfiles[iso].country} has fared {countryProfiles[iso].covid_performance} than other countries in the Scorecard in confronting the pandemic
            . {f(countryProfiles[iso].vax_percent)}% of the population is fully vaccinated, which is {countryProfiles[iso].vax_rank} than average 
            and {f(countryProfiles[iso].deaths_per_100k)} people per 100,000 have died of the coronavirus, 
            while the average for countries in the Scorecard is {f(countryProfiles[iso].study_deaths_average)}. 
            The government spends {f(countryProfiles[iso].healthcare_spending_per_capita)} Euros per capita on health care, 
            which is {countryProfiles[iso].healthcare_rank} average for other countries in the Scorecard. 
            </p> */}
            <Grid stackable centered  className="descriptionStats" columns={3}>
              <Grid.Row stretched>
                <Grid.Column>
                  <Popup 
                    flowing 
                    hoverable
                    trigger={
                      <div className={"descriptionStatsBox " + getGoodOrBad(countryProfiles[iso].vax_rank)}>
                        <span className={"descriptionStatsBoxMainFig"}>{f(countryProfiles[iso].vax_percent)}%</span> <br/>
                        {/* of the population is fully vaccinated, <br/> <br/> */}
                        {/* This is <b>{countryProfiles[iso].vax_rank} than average</b> of {f(countryProfiles[iso].vax_average)}% across countries in the Scorecard. */}
                        
                        <Trans i18nKey="Vaccinated Blurb" average={f( countryProfiles[iso].vax_average)}>
                        of the population is fully vaccinated, <br/><br/> 
                        This is <b>{countryProfiles[iso].vax_rank} than average</b> of {{average:f(countryProfiles[iso].vax_average)}}% across countries in the Scorecard.
                        </Trans>
                      </div>
                    }>
                      {t("Source")}: <a href="https://github.com/owid/covid-19-data/blob/master/public/data/vaccinations">Our World in Data</a> <br />{t("Retrieved on ") + countryFactsRetrievedOn}
                  </Popup>
                </Grid.Column>
                <Grid.Column>
                  <Popup 
                    flowing 
                    hoverable
                    trigger={
                      <div className={"descriptionStatsBox " + getGoodOrBad(countryProfiles[iso].deaths_rank)}>
                        
                        <span className={"descriptionStatsBoxMainFig"}>{f(countryProfiles[iso].deaths_per_100k)}</span> <br/>
                        {/* people per 100,000 have died of the coronavirus, <br/> <br/> */}
                        {/* This is <b>{countryProfiles[iso].deaths_rank} than average</b> of {f(countryProfiles[iso].study_deaths_average)} across countries in the Scorecard. */}


                        <Trans i18nKey="COVID Deaths Blurb" average={f(countryProfiles[iso].study_deaths_average)}>
                        people per 100,000 have died of the coronavirus, <br/><br/>
                        This is <b>{countryProfiles[iso].deaths_rank} than average</b> of {{average:f(countryProfiles[iso].study_deaths_average)}} across countries in the Scorecard.
                        </Trans>
                      </div>
                    }>
                      {t("Source")}: <a href="https://github.com/owid/covid-19-data/tree/master/public/data">Our World in Data</a> <br /> {t("Retrieved on ") + countryFactsRetrievedOn}
                  </Popup>
                </Grid.Column>
                <Grid.Column>
                  <Popup 
                    flowing 
                    hoverable
                    trigger={
                      <div className={"descriptionStatsBox " + getGoodOrBad(countryProfiles[iso].healthcare_rank)}>
                        <span className={"descriptionStatsBoxMainFig"}>€{f(countryProfiles[iso].healthcare_spending_per_capita)}</span> <br/>
                        {/* per capita is spent by the government on health care, <br/> <br/> */}
                        {/* This is <b>{countryProfiles[iso].healthcare_rank} average</b> of €{f(countryProfiles[iso].healthcare_spending_avg)} across countries in the Scorecard. */}


                        <Trans i18nKey="Health Spending Blurb" average={f(countryProfiles[iso].healthcare_spending_avg)}>
                        per capita is spent by the government on health care, <br/><br/>
                        This is <b>{countryProfiles[iso].healthcare_rank} average</b> of €{{average:f(countryProfiles[iso].healthcare_spending_avg)}} across countries in the Scorecard.
                        </Trans>
                      </div>
                    }>
                      {t("Source")}: <a href="https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD">World Bank</a> <br /> {t("Retrieved on ") + countryFactsRetrievedOn}
                  </Popup>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                {
                  ['GRC'].includes(iso)
                  ? <div>This page is also availble in {renderLanguageOptions(i18n,t,'/scorecard/'+iso+'/')}.</div>
                  : null
                }
              </Grid.Row>
              {
                i18n.language === 'en'
                ? <Grid.Row>
                    <ScoreCardExplainer
                      open={openExplainer}
                      setOpen={setOpenExplainer}
                      questionData={questions[i18n.language]}
                      scoreData={countryDataNestToScore}
                    />         
                    <Button onClick={() => setOpenExplainer(true)}>Read Explainer Article</Button>
                    <br/>
                    <br/>
                  </Grid.Row>
                : null
              }              
            </Grid>
          </Grid.Column>
        </Grid.Row>
        {/* <ScorecardWaterfallChart
          data={{ 
            subagg: countryDataNestToScore[iso]["subagg"],
            agg: countryDataNestToScore[iso]["aggregate"]
          }}
          width={600}
          height={200}
        /> */}
        {/* <Grid.Row> */}

        {/* <Grid.Column width={16}> */}
        {
          categories.map(cat => {
            const catShort = catInitials[cat].short;
            return <Grid stackable  className="MainContainer" key={catShort+"Group"}>
              <Grid.Row>
              <h2 className={"scoreCardPageSubHead"}>{t(cat)}</h2>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>
                  <img src={iconsPathPrefix+"categories/"+catShort+"Complex.svg"}  width={240}/>
                </Grid.Column>
                <Grid.Column width={12}  className={"scoreCardDescription"}>
                  {/* <p>{scoreCardText[cat]}</p> */}
                  <p>{t(cat+" Blurb")}</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card.Group centered>
                    {
                      // Object.keys(countryDataNestToScore[iso][catShort]).map(question => {
                      generateCardOrder(cat).map((pair,i) => {
                        // console.log(pair)
                        if (pair.type === "question") {
                          const question = pair.item
                          return <ScorecardQuestion
                            data={{
                              question: questions[i18n.language][question][0],
                              score: countryDataNestToScore[iso][catInitials[cat].short][question][0]
                            }}
                            width={260}
                            height={100}
                            key={"Question"+question}
                            shareRoute={"/share/card/question/"+iso+"/"+catInitials[cat].short+"/"+pair.item}
                          />
                        } else {
                          return <Quote
                            data={pair.item}
                            width={260}
                            height={100}
                            key={"Quote"+i}
                            shareRoute={"/share/card/quote/"+iso+"/q/"+pair.item.id}
                          />
                        }
                      })
                    }    
                  </Card.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          })
        }
        {
          additionalQuotes.length > 0
          ? <Grid stackable  className="MainContainer" key={"AdditionalQuotesGroup"}>
              <Grid.Row>
                <h2 className={"scoreCardPageSubHead"}>{t("Additional Comments from Experts")}</h2>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card.Group centered>
                    {
                      additionalQuotes.map((item,i) => {
                        return <Quote
                          data={item}
                          key={"AdditionalQuote"+i}
                          shareRoute={"/share/card/quote/"+iso+"/q/"+item.id}
                        />
                      })
                    }
                  </Card.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          : null
        }
        {/* </Grid.Column> */}
        {/* </Grid.Row> */}
      </Grid>
    </Container>
  );
}

export default ScorecardPage;