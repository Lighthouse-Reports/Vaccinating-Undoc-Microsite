
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Grid } from "semantic-ui-react";
import { data } from '../helpers/datasets';
import {quotesNest} from '../helpers/quotes';
import {stringListConcat} from '../helpers/stringListConcat';
import { getGoodOrBad } from "../helpers/getGoodOrBad";
import { Button, Card, Image, Container } from 'semantic-ui-react'
import ScorecardQuestion from "../components/ScorecardQuestion";
import ScorecardWaterfallChart from "../components/ScorecardWaterfallChart";
import BigHexComponent from "../components/BigHexComponent";
import Quote from "../components/QuoteComponent";
import DecoratedString from "../components/DecoratedStringComponent";
import { catInitials, iconsPathPrefix } from "../helpers/constants";
import { format } from 'd3-format';
import { randomInt } from 'd3-random';


function ScorecardPage(props) {

  const { iso } = props.match.params;
  const categories = Object.keys(catInitials);
  const { countryDataNestToScore, questions, isoToCountryLookup, countryData,
    categoryScoresExtent, countryProfiles } = data;

  const [highlightCat, setHighlightCat] = useState("");

  const openCatsRemoveConfused = countryProfiles[iso].open_categories.filter(c => !countryProfiles[iso].incomplete_categories.includes(c));
  const closedCatsRemoveConfused = countryProfiles[iso].closed_categories.filter(c => !countryProfiles[iso].incomplete_categories.includes(c));

  const highlightCatMouseOver = (cat) => {
    setHighlightCat(cat)
  }

  const highlightCatMouseOut = () => {
    setHighlightCat("")  
  }

  const f = format(",.0f")

  const scoreCardText = {
    "Policy Transparency": "Policy Transparency evaluates government efforts to make national vaccine policies available to the public.  We determined whether an official vaccine strategy is online, whether the government has made public statements explaining the strategy, whether the budget is public, who was involved in developing the strategy and finally whether undocumented people were part of the process.",
    "Undocumented Access": "Undocumented Access addresses the central question of the scorecard: are undocumented people able to access vaccination against COVID-19? This is where researchers identified whether undocumented people are included in the language of both written and oral vaccination policies, whether undocumented people can access vaccination without an ID, and whether access is equitable: undocumented people able to get vaccinated on the same basis as regularly residing individuals, and the type and choice of vaccine, costs and prioritisation are the same.",
    "Identification and Residency Requirements": "Identification and Residency Requirements is an indirect means to determine whether the undocumented are able to get vaccinated. Researchers evaluated whether national vaccination policies are explicit in the type of documentation that is needed to access the vaccine, both in terms of identification and residency.",
    "Marginalized Access": "Marginalised Access attempts to evaluate how a country is accommodating the needs of other marginalized groups within its borders.  The scorecard evaluates policies towards people in detention centres or without freedom of movement, people who are not fluent in the local language, people without internet access or means of transportation and people who are housing insecure. We evaluated how these groups are addressed overall, with the understanding  that undocumented people may also be part of these groups.",
    "Privacy Guarantees": "Privacy Guarantees evaluates policies related to the collection, processing and sharing of data.  Researchers evaluated whether these policies are publicly available and whether assurances are provided that data collected prior to and during vaccination will not be shared outside health authorities. Undocumented people often avoid accessing public services out of fear that their residency status will be reported to government authorities. Privacy guarantees are therefore critical to making vaccines accessible. Lastly, researchers measured whether the certificate of vaccination indicates the location where the vaccination took place, with the understanding that this may create additional barriers for undocumented people if they seek to move to another country undetected."
  }


  const quotesAll = quotesNest[isoToCountryLookup[iso]["country_name"]];
  // console.log(quotesAll)

  const additionalQuotes = quotesAll && quotesAll["Uncategorised"] && quotesAll["Uncategorised"].length > 0
    ? quotesAll["Uncategorised"]
    : []

  

  const generateCardOrder = (cat) => {
    const scoreCards = countryDataNestToScore[iso][catInitials[cat].short];
    const scoreCardKeys = Object.keys(scoreCards);
    const quoteIndices = [1,3,5,7,9,11];
    // const scoreCardValues = Object.values(scoreCards);
    const quotes = quotesNest[isoToCountryLookup[iso]["country_name"]] 
      ? quotesNest[isoToCountryLookup[iso]["country_name"]][cat]
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
            <svg width={335} height={350}>
            <BigHexComponent
              width={180}
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
            />
            </svg>
            </Container>
          </Grid.Column>
          <Grid.Column tablet={9} computer={11} className={"scoreCardDescription"}>
            <p>
            {countryProfiles[iso].country} overall leans more towards <DecoratedString stringText={countryProfiles[iso].overall_confidence_rank === "strong" ? countryProfiles[iso].overall_rank : "confused"}/>.
            </p>

            <p>It has a <DecoratedString stringText={countryProfiles[iso].confidence_rank + " confidence score"} stringClass={countryProfiles[iso].confidence_rank}/>, meaning that the documents we analysed for the Scorecard were fairly {countryProfiles[iso].completeness_of_documents}.
            {/* . The country is more open and accessible for {countryProfiles[iso].open_categories.join(", ")}  */}
            {/* and more exclusionary or less transparent for {countryProfiles[iso].closed_categories.join(", ")}  */}

            {
              countryProfiles[iso].incomplete_categories.length > 0
              ? <> Due to incompleteness of data, it was difficult to evaluate {stringListConcat(countryProfiles[iso].incomplete_categories, "", highlightCatMouseOver, highlightCatMouseOut)}.</>
              : ""
            }
            </p>

            <p>
            {
              countryProfiles[iso].open_categories.length > 0
              ? <>The country is more open and accessible for {
                  // stringListConcat(countryProfiles[iso].open_categories, "", highlightCatMouseOver, highlightCatMouseOut)
                  stringListConcat(openCatsRemoveConfused, "", highlightCatMouseOver, highlightCatMouseOut)
                }</>
              : ""
            }
            {
              countryProfiles[iso].closed_categories.length > 0
              // ? <>, and more exclusionary or less transparent for {stringListConcat(countryProfiles[iso].closed_categories, "", highlightCatMouseOver, highlightCatMouseOut)}. </>
              ? <>, and more exclusionary or less transparent for {stringListConcat(closedCatsRemoveConfused, "", highlightCatMouseOver, highlightCatMouseOut)}. </>
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
                  <div className={"descriptionStatsBox " + getGoodOrBad(countryProfiles[iso].vax_rank)}>
                    <span className={"descriptionStatsBoxMainFig"}>{f(countryProfiles[iso].vax_percent)}%</span> <br/>
                    of the population is fully vaccinated, <br/> <br/>
                    This is <b>{countryProfiles[iso].vax_rank} than average</b> of {f(countryProfiles[iso].vax_average)}% across countries in the Scorecard.
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className={"descriptionStatsBox " + getGoodOrBad(countryProfiles[iso].deaths_rank)}>
                    
                    <span className={"descriptionStatsBoxMainFig"}>{f(countryProfiles[iso].deaths_per_100k)}</span> <br/>
                    people per 100,000 have died of the coronavirus, <br/> <br/>
                    This is <b>{countryProfiles[iso].deaths_rank} than average</b> of {f(countryProfiles[iso].study_deaths_average)} across countries in the Scorecard.
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className={"descriptionStatsBox " + getGoodOrBad(countryProfiles[iso].healthcare_rank)}>
                    <span className={"descriptionStatsBoxMainFig"}>€{f(countryProfiles[iso].healthcare_spending_per_capita)}</span> <br/>
                    per capita is spent by the government on health care, <br/> <br/>
                    This is <b>{countryProfiles[iso].healthcare_rank} average</b> of €{f(countryProfiles[iso].healthcare_spending_avg)} across countries in the Scorecard.
                  </div>
                </Grid.Column>
              </Grid.Row>
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
              <h2 className={"scoreCardPageSubHead"}>{cat}</h2>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>
                  <img src={iconsPathPrefix+"categories/"+catShort+"Complex.svg"}  width={240}/>
                </Grid.Column>
                <Grid.Column width={12}  className={"scoreCardDescription"}>
                  <p>{scoreCardText[cat]}</p>
                  {/* <p>For a more detailed breakdown of questions, please refer to the section below.</p> */}
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
                              question: questions[question][0],
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
                <h2 className={"scoreCardPageSubHead"}>Additional Comments from Experts</h2>
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