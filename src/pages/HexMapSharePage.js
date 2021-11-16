
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Container } from "semantic-ui-react";
import { data } from '../helpers/datasets';
import MainMap from '../components/MainMap';


function HexMapSharePage(props) {

  console.log(data);
  return (
    <div className={'HomePage'} >
      <Container className="MainContainer">
        
        <MainMap
          width={1000}
          height={750}
          data={data}
          downloadable={false}
          sharable={false}
        />
      </Container>
    </div>
  );
}

export default HexMapSharePage;