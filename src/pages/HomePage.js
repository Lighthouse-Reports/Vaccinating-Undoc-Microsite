
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Grid } from "semantic-ui-react";
import { data } from '../helpers/datasets';
import MainMap from '../components/MainMap';


function HomePage(props) {

  console.log(data);
  return (
    <div className={'HomePage'} >
      <Grid container className="MainContainer">
        <MainMap
          width={1000}
          height={1000}
          data={data}
        />
      </Grid>
    </div>
  );
}

export default HomePage;