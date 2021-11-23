import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import { createHashHistory } from 'history';
import { createMedia } from "@artsy/fresnel";
import { useMediaQuery } from 'react-responsive'
import {
  Divider, Container, Menu, Dropdown, Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Sidebar,
  Button,
} from "semantic-ui-react";

import styled from "styled-components";
import { logoPathPrefix } from '../helpers/constants';

// Pages
import HomePage from '../pages/HomePage';
import ExplainerPage from '../pages/ExplainerPage';
import ComparePage from '../pages/ComparePage';
import ScorecardPage from '../pages/ScorecardPage';
import MethodologyPage from '../pages/MethodologyPage';
import AdvocacyPage from '../pages/AdvocacyPage';
import AboutPage from '../pages/AboutPage';
import MenuItems from './MenuItems';
import HexMapSharePage from '../pages/HexMapSharePage';
import CardSharePage from '../pages/CardSharePage';
import Footer from './Footer';
import InvestigationPage from '../pages/InvestigationPage';


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
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const [visible, setVisible] = React.useState(false)

  return (
    // <BrowserRouter history={history} basename={process.env.PUBLIC_URL}>
    <BrowserRouter history={history} basename={"/Vaccinating-Undoc-Microsite"}>
      {/* <Wrapper> */}
      {/* <Route
        render={props => (
          <HeaderNav {...props} />
        )}
      /> */}
      <Switch>
        <Route
          exact
          path="/share/hexmap"
          component={HexMapSharePage}
        />
        <Route
          exact
          path="/share/card/:cardtype/:iso/:cat/:id"
          component={CardSharePage}
        />
        <Route
          path="/"
        >
          <Grid columns={1}>
            <Grid.Column>
              <Sidebar.Pushable as={Segment}>
                <Sidebar
                  as={Menu}
                  animation='overlay'
                  icon='labeled'
                  inverted
                  onHide={() => setVisible(false)}
                  vertical
                  visible={visible}
                  width='thin'
                >
                  <MenuItems />
                </Sidebar>

                <Sidebar.Pusher dimmed={visible}>
                  <Segment basic>
                    {
                      isMobile ? <Container>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={2}>
                              <Icon onClick={() => setVisible(true)} name='align justify'>
                                {/* <Button.Content>
                              <Icon name='align justify'/>
                            </Button.Content> */}
                              </Icon>
                            </Grid.Column>
                            <Grid.Column width={14}>
                              <a href="https://www.lighthousereports.nl/"><img src={logoPathPrefix} className={"logo mobile"} /></a>
                              <a href="/Vaccinating-Undoc-Microsite/"> <h4 className={"mainTitle"}>Vaccinating Europe's Undocumented: A Policy Scorecard</h4></a>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Container> : <Container>
                        <a href="https://www.lighthousereports.nl/"><img src={logoPathPrefix} className={"logo"} /></a>
                        <a href="/Vaccinating-Undoc-Microsite/"><h2 className={"mainTitle"}>Vaccinating Europe's Undocumented: A Policy Scorecard</h2></a>
                        <Menu secondary className="HeaderNav">
                          <MenuItems />
                        </Menu>
                      </Container>
                    }

                    {/* <HeaderNav {...props} /> */}
                    <Divider />
                    <Switch>
                      <Route
                        exact
                        path="/"
                        component={HomePage}
                      />
                      <Route
                        exact
                        path="/explainer"
                        component={ExplainerPage}
                      />
                      <Route
                        exact
                        path="/compare"
                        component={ComparePage}
                      />
                      <Route
                        exact
                        path="/scorecard/:iso"
                        component={ScorecardPage}
                      />
                      <Route
                        exact
                        path="/methodology"
                        component={MethodologyPage}
                      />
                      <Route
                        exact
                        path="/about"
                        component={AboutPage}
                      />
                      <Route
                        exact
                        path="/investigations"
                        component={InvestigationPage}
                      />
                    </Switch>
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Grid.Column>
          </Grid>
        </Route>
      </Switch>

      <Footer />

      {/* </Wrapper> */}

    </BrowserRouter>
  );
}


export default Routes;
