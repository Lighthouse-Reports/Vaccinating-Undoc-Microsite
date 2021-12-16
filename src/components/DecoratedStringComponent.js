import React, { useState, useRef, useEffect } from 'react';
import { colors, getColor, getBackgroundColor, paddings, questionBar, medianBar, 
  catInitials, scoreCardCircleRadii, medianMarker, blankAnswer, quoteInfo } from '../helpers/constants';
import { getGoodOrBad } from '../helpers/getGoodOrBad';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max } from 'd3-array';
import { Button, Card, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

function DecoratedString(props) {
  const { stringText, stringClass, stringIcon, mouseOver, mouseOut, stringFunction} = props;

  const { t } = useTranslation();

  return (
    <div 
      className={
        "decoratedString " 
        + (stringClass 
          ? getGoodOrBad(stringClass) 
          : getGoodOrBad(stringText))}
      onMouseOver={mouseOver ? () => mouseOver(stringText) : null}
      onMouseOut={mouseOut ? () => mouseOut() : null}
    >
      {t(stringText)} 
      {
        stringIcon 
        ? <Icon 
            link 
            name={stringIcon}>
          </Icon>
        : null
      }
    </div>

  )

}

export default DecoratedString;