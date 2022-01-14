import React, { useState, useRef, useEffect } from 'react';
import { colors, getColor, getBackgroundColor, paddings, questionBar, medianBar, 
  catInitials, scoreCardCircleRadii, medianMarker, blankAnswer, quoteInfo, hexCatTextLabels } from '../helpers/constants';
import { getGoodOrBad } from '../helpers/getGoodOrBad';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max } from 'd3-array';
import { Button, Grid, Container, Icon, Modal } from 'semantic-ui-react';
import BigHexComponent from '../components/BigHexComponent'
import { useTranslation } from 'react-i18next';

function BigHexModal(props) {
  const { width, height, multiplier, data, scoresExtent, dy,
    countryInfo,selectHighlightCountry,highlightCountry,noCountryLabel,
    iconsPathPrefix,countryRank,country,pathToScoreCard,
    open, labelWidths } = props;


  const { t } = useTranslation();

  const hexHolderRef = useRef();
  const [parentWidth, setParentWidth] = useState(width);

  useEffect(() => {
    let clientWidth = hexHolderRef.current.clientWidth;
    // console.log("Ref width: " + clientWidth, hexHolderRef);
    if (clientWidth) setParentWidth(clientWidth);
  }, [hexHolderRef, hexHolderRef.current ? hexHolderRef.current.clientWidth : null])

  return (
    <Modal
      basic
      centered={false}
      closeIcon
      onClose={() => selectHighlightCountry("")}
      // onOpen={() => setOpen(true)}
      open={open}
      size='tiny'
      // trigger={<Button>Basic Modal</Button>}
    >
      {/* <Header icon>
        <Icon name='archive' />
        Archive Old Messages
      </Header> */}
      <Modal.Content>
        <Grid centered columns={1}>
          <Grid.Row>
            <Grid.Column
              className="bigHexHolderColumn"
            >
              <svg 
                className="bigHexHolder" 
                width={"100%"} 
                height={height*2}
                ref={hexHolderRef}
              >
                <BigHexComponent
                  width={width}
                  parentWidth={parentWidth}
                  height={height}
                  multiplier={multiplier}
                  data={data}
                  scoresExtent={scoresExtent}
                  dy={dy}
                  countryInfo={countryInfo}
                  selectHighlightCountry={selectHighlightCountry}
                  noCountryLabel={noCountryLabel}
                  iconsPathPrefix={iconsPathPrefix}
                  highlightCat={""}
                  labelWidths={labelWidths.map(width => width+hexCatTextLabels.r*2)}
                />
              </svg>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <a href={"/scorecard/"+highlightCountry}>
            <div className={"hexModalMainLabel " + getGoodOrBad(countryRank)}>
              {/* Overall score: {countryRank} <br/> */}
              {t("Overall score") + ": " + t(countryRank)} <br/>

              <div className={"hexModalSecondaryLabel"}>{t("Click here to view scorecard for " + country)}</div>
            </div>
            </a>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button> */}
        <Button  inverted onClick={() => selectHighlightCountry("")}>
          <Icon name='arrow left' /> {t("Back")}
        </Button>
      </Modal.Actions>
    </Modal>
    

  )

}

export default BigHexModal;