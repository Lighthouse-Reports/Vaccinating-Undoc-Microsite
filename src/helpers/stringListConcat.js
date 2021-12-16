import React from "react";
import DecoratedString from "../components/DecoratedStringComponent";

export const stringListConcat = (stringListInput, scores, mouseOver, mouseOut, t) => {

  const scoreArray = Array.isArray(scores) ? scores : stringListInput.map(s => scores)

  const stringList = stringListInput.map((item,i) => 
    (
      <DecoratedString 
        stringText={item} 
        stringClass={scoreArray[i]}
        mouseOver={mouseOver}
        mouseOut={mouseOut}
      />
    )
  )

  if (stringList.length === 1) return stringList
  else {
    let everythingExecptLast = +stringList.slice(0,stringList.length - 1).map((item,i) => {
      return <>{item}, </>
    })
    // if (stringList.length > 2) everythingExecptLast += ","
    return <>
      {
        stringList.slice(0,stringList.length - 1).map((item) => {
          return <>{item}, </>
        })
      } {t("and")} {stringList[stringList.length - 1]}
    </>
  }
}