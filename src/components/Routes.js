import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import { createHashHistory } from 'history';
import { createMedia } from "@artsy/fresnel";
import { Divider, Container } from "semantic-ui-react";

import styled from "styled-components";

// Components
import HeaderNav from "./HeaderNav";

// Pages
import HomePage from '../pages/HomePage';
import ScorecardPage from '../pages/ScorecardPage';
import AboutPage from '../pages/AboutPage';


const history = createHashHistory();

// const Wrapper = styled.div`
//   display: flex;
//   min-height: 100vh;
//   flex-direction: column;
// `;

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920
  }
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

function Routes(props) {

  return (
    <BrowserRouter history={history}>
      {/* <Wrapper> */}
      {/* <Route
        render={props => (
          <HeaderNav {...props} />
        )}
      /> */}
      <HeaderNav {...props} />
      <Divider/>
      <Switch>
        <Route
          exact
          path="/"
          component={HomePage}
        />
        <Route
          exact
          path="/scorecard/:iso"
          component={ScorecardPage}
        />
        <Route
          exact
          path="/about"
          component={AboutPage}
        />
      </Switch>
      {/* </Wrapper> */}

    </BrowserRouter>
  );
}


export default Routes;
