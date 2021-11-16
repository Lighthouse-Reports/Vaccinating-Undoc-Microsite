import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, withRouter, useHistory } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";

// Helpers
import { data } from "../helpers/datasets";

export default (props) => {
  // const getUri = props.location.pathname.split("/");
  // const currentPath = getUri[1];

  const [activeItem, setActiveItem] = useState("home");
  const { countryToIsoLookup } = data;

  let history = useHistory();

  const handleItemClick = (item) => {
    setActiveItem(item);
    history.push(item);
  };

  return (
    <>
      <Menu.Item
        as={Link}
        to="/"
        name="home"
        active={activeItem === "home"}
        onClick={() => handleItemClick("home")}
        passHref
      />
      {/* <Menu.Item
                as={Link} to="/explainer"
                name='explainer'
                active={activeItem === 'explainer'}
                onClick={() => handleItemClick('explainer')}
            /> */}
      <Menu.Item
        as={Link}
        to="/compare"
        name="compare countries"
        active={activeItem === "compare"}
        onClick={() => handleItemClick("compare")}
      />
      <Menu.Item>
        <Dropdown scrolling text="Scorecards">
          <Dropdown.Menu>
            {Object.keys(countryToIsoLookup).map((country) => {
              const iso = countryToIsoLookup[country].iso3;
              return (
                <Dropdown.Item
                  as={Link}
                  to={"/scorecard/" + iso}
                  name={iso}
                  active={activeItem === iso}
                  onClick={() => handleItemClick(iso)}
                  text={country}
                  key={"navLink" + iso}
                ></Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/methodology"
        name="methodology"
        active={activeItem === "methodology"}
        onClick={() => handleItemClick("methodology")}
      />
      {/* <Menu.Item
        as={Link}
        to="/advocacy"
        name="advocacy"
        active={activeItem === "about"}
        onClick={() => handleItemClick("advocacy")}
      /> */}
      <Menu.Item
        as={Link}
        to="/about"
        name="about"
        active={activeItem === "about"}
        onClick={() => handleItemClick("about")}
      />
    </>
  );
};
