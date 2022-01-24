import React from "react";
import { Link } from 'react-router-dom';

export function renderLanguageOptions(i18nContext,t,path) {
  const options = i18nContext.otherOptions(i18nContext.language);

  return options.map((option,i) => {
    // console.log(option)
    return <>
      { i === 0 ? "" :  i === options.length - 1 ? " and " : ", " }
      <span><Link to={path+option.code}>{option.label}</Link></span>
    </>
  })
} 