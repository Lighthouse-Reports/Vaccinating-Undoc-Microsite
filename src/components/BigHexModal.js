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
  const { width, height, multiplier, data, scoresExtent, dx,dy,
    countryInfo,selectHighlightCountry,highlightCountry,noCountryLabel,
    iconsPathPrefix,countryRank,country,pathToScoreCard,
    open, labelWidths } = props;


  const { t } = useTranslation();

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
            <Grid.Column>
              <svg className="bigHexHolder" width={width*1.9} height={height*2}>
                <BigHexComponent
                  width={width}
                  parentWidth={width*1.9}
                  height={height}
                  multiplier={multiplier}
                  data={data}
                  scoresExtent={scoresExtent}
                  dx={dx}
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
            <a href={"/Vaccinating-Undoc-Microsite/scorecard/"+highlightCountry}>
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