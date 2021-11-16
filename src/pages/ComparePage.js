
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Grid } from "semantic-ui-react";
import { catInitials } from "../helpers/constants";
import { data } from "../helpers/datasets"
import CountryComparisonChart from "../components/CountryComparisonChart";


function ComparePage(props) {


  const categories = Object.keys(catInitials);
  const { categorySubaggData, categoryData } = data;
  
  const cleanedData = {};


  return (
    <div className={'ComparePage'} >
      <Grid container className="MainContainer">
        <Grid.Row>
          <Grid.Column>
            <h1 className={"scoreCardPageHead"}>Countries Comparison</h1>          
            <h4>Explore how countries perform across the different categories of the Scorecard.</h4>          
          </Grid.Column>
        </Grid.Row>
        {
          categories.map(cat => {
            const catShort = catInitials[cat].short;
            return <Grid.Row>
                <Grid.Column>
                  <div key={+"Group"}>
                    <h2 className={"scoreCardPageSubHead"}>{cat}</h2>
                    <CountryComparisonChart
                      width={320}
                      height={300}
                      data={categorySubaggData[cat]}
                      // dataArray={categoryData[catShort]}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
          })
        }
      </Grid>
    </div>
  )
}

export default ComparePage;