import ReactGA from 'react-ga';

const ga = () => {
    const GA_ID = 'G-0S5GK16F68'; // your google analytics id
    ReactGA.initialize(GA_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
};

export default ga;