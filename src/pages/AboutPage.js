
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Container, Grid } from "semantic-ui-react";


function AboutPage(props) {

  return (
    <div className={'AboutPage'} >
      {/* <Grid container className="MainContainer">
        
      </Grid> */}
      <Container>
        <h3>What is this project</h3>
        <p>
          Vaccinating the Undocumented attempted the unattemptable: measuring data related to undocumented populations in Europe. And not only that, but during a time of a public health emergency, when undocumented people are all but forgotten.
          <br />
          <br />
          Governments across Europe have called for their citizens to come together in the face of a public health emergency and appealed to a sense of civic duty to get vaccinated. Absent from the conversation, and from most public health debates, are non-citizens, who can be often among those most in need of healthcare.
          <br />
          <br />
          Undocumented migrants, known as “shadow populations”, are particularly vulnerable for a variety of reasons, but it is extremely difficult to measure how badly the pandemic has hit them and what governments are doing in response.
          <br />
          <ul>
            <li>
              Many countries go out of their way not to produce accurate estimates of how many undocumented migrants are living within their borders
            </li>
            <li>
              Many countries exclude undocumented people from the public health care system so reaching out to and counting them is difficult
            </li>
            <li>
              Many countries are afraid of political backlash if they do invest resources in vaccinating undocumented people, so they prefer to do it quietly
            </li>
          </ul>
          <br />
          Despite these challenges, this scorecard takes the publicly available policy information that is out there and evaluates how much or how little, at least on paper, countries across Europe are doing to make the COVID-19 vaccine accessible to undocumented people.
          <br />
          <br />
          In many ways, the findings are not surprising. Cases of explicit exclusion or inclusion are rare. In most cases, policies are vague and open to interpretation.
        </p>
        <br />
        <br />
        <h2>Why we did it</h2>
        <br />
        <br />
        <h2>How we did it</h2>
        <p>
        With the help of specialists on access to health care for the undocumented, we designed a survey to capture the vaccination against COVID-19 for undocumented people across Europe. With the help of researchers and journalism students, we tracked down publicly available documents related to the vaccination strategies and implementation plans of every individual country. With the help of data experts, we converted the responses into numbers, and the numbers into a Scorecard.
          <br />
          <br />
          The National Scorecard shows you how each of the 18 countries is doing across five categories: 
          <br />
          <ul>
            <li>Transparency</li>
            <li>Access for the undocumented</li>
            <li>Identity and residency requirements</li>
            <li>Access for the marginalised</li>
            <li>Privacy guarantees</li>
          </ul>
        </p>
      </Container>
    </div>
  );
}

export default AboutPage;