import './App.scss';
import React from "react";
import RoutesComponent from './components/Routes';
import GA4React, { useGA4React } from "ga-4-react";
// import ga from './helpers/ga';

const ga4react = new GA4React("G-0S5GK16F68");


function App() {
  const ga = useGA4React();
  console.log(ga);
  return (

    <div className="AppRoot">
      <RoutesComponent />
    </div>
  );
}

export default App;
