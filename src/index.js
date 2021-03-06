import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GA4React, { useGA4React } from "ga-4-react";
import './i18n/config';


const ga4react = new GA4React("G-54GET7EG27");

(async () => {

  try {
    await ga4react.initialize();
  }
  catch(err) {
    console.log("Error: " + err + ".");
  }
  finally {
    ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
    );  
  }

})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
