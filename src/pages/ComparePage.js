
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
            
            
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h2 className={"scoreCardPageSubHead"}>Overall</h2>
            <p>Countries with little public information for the given category are shown "Confused", and among the rest, those that scored low on the scorecard are considered "Exclusionary or less transparent", and those that scored high on the scorecard are considered "Open and accessible".</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div key={"MainGroup"}>
              
              <CountryComparisonChart
                width={320}
                height={300}
                data={categorySubaggData["Undocumented Access"].map(d => ({"Country":d.Country,"Iso3":d.Iso3}))}
                range={["Exclusionary or less transparent","Open and accessible"]}
                // dataArray={categoryData[catShort]}
                modalState={openExplainer}
                countryProfiles={countryProfiles}
                category={"overall"}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        {
          categories.map((cat,i) => {
            const catShort = catInitials[cat].short;
            return <Grid stackable >
              <Grid.Row>
                <Grid.Column>
                  <div key={"Group"+i}>
                    <h2 className={"scoreCardPageSubHead"}>{cat}</h2>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={3}>
                  <img src={iconsPathPrefix+"categories/"+catShort+"Complex.svg"}  width={240}/>
                </Grid.Column>
                <Grid.Column width={12}  className={"scoreCardDescription"}>
                  {scoreCardText[cat]}
                  {/* <p>For a more detailed breakdown of questions, please refer to the section below.</p> */}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column className={"comparisonChartContainerParent"}>
                  <div key={+"Group"} className={"comparisonChartContainer"}>
                    <CountryComparisonChart
                      width={320}
                      height={300}
                      data={categorySubaggData[cat].map(d => ({"Country":d.Country,"Iso3":d.Iso3}))}
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