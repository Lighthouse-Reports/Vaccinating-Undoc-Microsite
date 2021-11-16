
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Container, Button } from "semantic-ui-react";
import { data } from '../helpers/datasets';
import MainMap from '../components/MainMap';
import HomeExplainer from "../components/explainers/HomeExplainer";


function HomePage(props) {

  const [openExplainer, setOpenExplainer] = useState(false);

  console.log(data);
  return (
    <div className={'HomePage'} >
      <Container className="MainContainer">
        <h4>The scorecard assesses national policies on vaccinating the undocumented against COVID-19. </h4>
        <p>Hover over a country for a snapshot of results or and click for a more in-depth look. </p>
        <Button onClick={() => setOpenExplainer(true)}>Read Explainer Article</Button>
        <br/>
        <br/>
        <HomeExplainer
          open={openExplainer}
          setOpen={setOpenExplainer}
        />
        <MainMap
          width={1000}
          height={750}
          data={data}
          downloadable={true}
          sharable={true}
        />
      </Container>
    </div>
  );
}

export default HomePage;