
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Grid } from "semantic-ui-react";
import { data } from '../helpers/datasets';
import { Button, Card, Image } from 'semantic-ui-react'
import ScorecardQuestion from "../components/ScorecardQuestion";
import { catInitials } from "../helpers/constants";


function ScorecardPage(props) {

  const { iso } = props.match.params;
  const categories = Object.keys(catInitials);
  const { countryDataNestToScore, questions, isoToCountryLookup } = data;

  return (
    <div className={'ScorecardPage'} >
      {/* <Grid container className="MainContainer">
        <Grid.Item>
          
        </Grid.Item>
      </Grid> */}
      <Grid container className="MainContainer">
        <h1 className={"scoreCardPageHead"}>{isoToCountryLookup[iso]["country_name"]}</h1>
        {
          categories.map(cat => {
            const catShort = catInitials[cat].short;
            return <div key={+"Group"}>
              <h2 className={"scoreCardPageSubHead"}>{cat}</h2>
              <Card.Group>
                {
                  Object.keys(countryDataNestToScore[iso][catShort]).map(question => {
                    return <ScorecardQuestion
                      data={{
                        question: questions[question][0],
                        score: countryDataNestToScore[iso][catInitials[cat].short][question][0]
                      }}
                      width={260}
                      height={100}
                      key={"Question"+question}
                    />
                  })
                }    
              </Card.Group>
            </div>
          })
        }
      </Grid>
    </div>
  );
}

export default ScorecardPage;