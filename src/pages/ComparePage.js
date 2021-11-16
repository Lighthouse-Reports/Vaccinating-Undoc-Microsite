
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Grid, Button } from "semantic-ui-react";
import { catInitials, scoreCardText, iconsPathPrefix } from "../helpers/constants";
import { data } from "../helpers/datasets"
import CountryComparisonChart from "../components/CountryComparisonChart";
import ComparisonExplainer from "../components/explainers/ComparisonExplainer";

function ComparePage(props) {

  const [openExplainer, setOpenExplainer] = useState(false);

  const categories = Object.keys(catInitials);
  const { categorySubaggData, countryProfiles } = data;
  
  const cleanedData = {};
  console.log(categorySubaggData);

  return (
    <div className={'ComparePage'} >
      <Grid container className="MainContainer">
        <Grid.Row>
          <Grid.Column>
            <h1 className={"scoreCardPageHead"}>Countries Comparison</h1>          
            <h4>Explore how countries perform across the different categories of the Scorecard.</h4> 
            
            <ComparisonExplainer
              open={openExplainer}
              setOpen={setOpenExplainer}
              categories={categories}
              categorySubaggData={categorySubaggData}
              catInitials={catInitials}
              modalState={openExplainer}
              countryProfiles={countryProfiles}
            />         
            <Button onClick={() => setOpenExplainer(true)}>Read Explainer Article</Button>
            <br/>
            <br/>
            
          </Grid.Column>
        </Grid.Row>
        {/* <Grid.Row>
          <Grid.Column>
            <div key={+"Group"}>
              <h2 className={"scoreCardPageSubHead"}>Overall</h2>
              <CountryComparisonChart
                width={320}
                height={300}
                data={categorySubaggData[cat]}
                range={["Exclusionary or less transparent","Open and accessible"]}
                // dataArray={categoryData[catShort]}
              />
            </div>
          </Grid.Column>
        </Grid.Row> */}
        {
          categories.map(cat => {
            const catShort = catInitials[cat].short;
            return <Grid stackable >
              <Grid.Row>
                <Grid.Column>
                  <div key={+"Group"}>
                    <h2 className={"scoreCardPageSubHead"}>{cat}</h2>
                  </div>
                </Grid.Column>
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
                <Grid.Column>
                  <div key={+"Group"}>
                    <CountryComparisonChart
                      width={320}
                      height={300}
                      data={categorySubaggData[cat]}
                      range={catInitials[cat].range}
                      // dataArray={categoryData[catShort]}
                      modalState={openExplainer}
                      countryProfiles={countryProfiles}
                      category={cat}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
              </Grid>
              })
        }
      </Grid>
    </div>
  )
}

export default ComparePage;