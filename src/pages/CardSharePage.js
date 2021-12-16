
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Grid } from "semantic-ui-react";
import { data } from '../helpers/datasets';
import {quotesNest, quotesRaw} from '../helpers/quotes';
import {stringListConcat} from '../helpers/stringListConcat';
import { getGoodOrBad } from "../helpers/getGoodOrBad";
import { Button, Card, Image, Container } from 'semantic-ui-react'
import ScorecardQuestion from "../components/ScorecardQuestion";
import ScorecardWaterfallChart from "../components/ScorecardWaterfallChart";
import BigHexComponent from "../components/BigHexComponent";
import Quote from "../components/QuoteComponent";
import DecoratedString from "../components/DecoratedStringComponent";
import { catInitials } from "../helpers/constants";
import { format } from 'd3-format';
import { randomInt } from 'd3-random';
import { useTranslation } from 'react-i18next';

function CardSharePage(props) {

  const { cardtype, iso, cat, id } = props.match.params;
  const categories = Object.keys(catInitials);
  const { countryDataNestToScore, questions, isoToCountryLookup, countryData,
    categoryScoresExtent, countryProfiles } = data;

    
  const { t, i18n } = useTranslation();

  const [highlightCat, setHighlightCat] = useState("");

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


  const quotesAll = quotesNest[i18n.language][isoToCountryLookup[iso]["country_name"]];
  // console.log(quotesNest[isoToCountryLookup[iso]["country_name"]])

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

  return cardtype === "question"
    ? <ScorecardQuestion
        data={{
          question: questions[id][0],
          score: countryDataNestToScore[iso][cat][id][0]
        }}
        width={260}
        height={100}
        key={"Question"+id}
        shareRoute={"/share/card/" +cardtype+"/"+iso+"/"+cat+"/"+id}
      />
    : <Quote
      data={quotesRaw[i18n.language].filter(q => q.id === +id)[0]}
      width={260}
      height={100}
      key={"Quote"+id}
      shareRoute={"/share/card/" +cardtype+"/"+iso+"/"+cat+"id"}
    />
  ;

}
export default CardSharePage;