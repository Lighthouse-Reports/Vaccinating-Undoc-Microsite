import React, { useState, useRef, useEffect } from 'react';
import { colors, getColor, getBackgroundColor, paddings, questionBar, medianBar, 
  catInitials, scoreCardCircleRadii, medianMarker, blankAnswer, quoteInfo } from '../helpers/constants';
import { getGoodOrBad } from '../helpers/getGoodOrBad';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max } from 'd3-array';
import { Button, Card, Icon } from 'semantic-ui-react';

function DecoratedString(props) {
  const { stringText, stringClass, stringIcon, mouseOver, mouseOut, stringFunction} = props;


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
      {stringText} 
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