import './App.scss';
import React from "react";
import RoutesComponent from './components/Routes';
import CookieConsent from "react-cookie-consent";
import GA4React, { useGA4React } from "ga-4-react";
// import ga from './helpers/ga';

const ga4react = new GA4React("G-54GET7EG27");


function App() {
  const ga = useGA4React();
  console.log(ga);
  return (

    <div className="AppRoot">
      <CookieConsent
        location="top"
        buttonText="Accept"
        cookieName="gaCookies"
        style={{ background: "#E3F3F6", color: '#000' }}
        buttonStyle={{ background: '#1CC691', color: "#fff", fontSize: "14px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <RoutesComponent />
    </div>
  );
}

export default App;
