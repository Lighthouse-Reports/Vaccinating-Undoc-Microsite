import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, withRouter, useHistory } from 'react-router-dom';
import { Container, Menu, Dropdown } from 'semantic-ui-react';

// Helpers
import { data } from '../helpers/datasets';

export default props => {
  // const getUri = props.location.pathname.split("/");
  // const currentPath = getUri[1];

  const [activeItem,setActiveItem] = useState('home')

  const { countryToIsoLookup } = data;


  let history = useHistory();

  const handleItemClick = (item) => {
    setActiveItem(item);
    history.push(item)
  }

  return (
    <Container>
    <h2>Vaccinating Europe's Undocumented: A Policy Scorecard</h2>
    <Menu secondary className="HeaderNav">
      {/* <Container> */}
        {/* <Menu.Item className="Logo">
          Vaccine Tracker
        </Menu.Item> */}
        <Menu.Item
          as={Link} to="/"
          name='home'
          active={activeItem === 'home'}
          onClick={() => handleItemClick('home')}
          passHref
        />
        <Menu.Item>
          <Dropdown scrolling text='Scorecards'>
            <Dropdown.Menu>
              {
                Object.keys(countryToIsoLookup).map(country => {
                  const iso = countryToIsoLookup[country].iso3;
                  return <Dropdown.Item
                      as={Link} to={"/scorecard/"+iso}
                      name={iso}
                      active={activeItem === iso}
                      onClick={() => handleItemClick(iso)}
                      text={country}
                      key={"navLink"+iso}
                    > 
                  </Dropdown.Item>
                })
              }
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item
          as={Link} to="/about"
          name='about'
          active={activeItem === 'about'}
          onClick={() => handleItemClick('about')}
        />
      {/* </Container> */}
    </Menu>
    </Container>
  );
};
