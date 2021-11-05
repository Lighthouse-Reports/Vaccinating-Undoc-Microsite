import { rgb, copy } from 'd3-color'


export const colors = {
  positive: '#2A9D8F',
  negative: '#E76F51',
  neutral: '#DDD'
}

export const getColor = (value) => {
  if (value === "") return colors.neutral
  else if (value > 0) return colors.positive
  else if (value <= 0) return colors.negative
  else return colors.neutral
}

export const getBackgroundColor = (value) => {
  if (value === "") return rgb(colors.neutral).copy({opacity:.3})
  else if (value > 0) return rgb(colors.positive).copy({opacity:.3})
  else if (value <= 0) return rgb(colors.negative).copy({opacity:.3})
  else return rgb(colors.neutral).copy({opacity:.3})
}

export const blankAnswer = "--"

export const questionBar = {
  rx: 4,
  ry: 4 ,
  height: 20,
  y: 30,
  fontSize: 12,
}

export const medianBar = {
  height: questionBar.height/4,
  y: questionBar.y + questionBar.height,
}

export const medianMarker = {
  width: 40,
  height: medianBar.height*2,
  fontSize: medianBar.height*1.8
}

export const paddings = {
  mainMap: 10,
  mapChartBorder: 20,
  mapChartInBetween: .1,
  scoreCardQuestionBarPercentage: .9,
  scoreCardQuestionLabelPadding: questionBar.height*2
}

export const scoreCardCircleRadii = {
  answer: questionBar.height/2,
  median: questionBar.height/6
}

export const questionExtents = {
  individualMax: 5
}

export const catInitials = {
  "Policy Transparency": {initial:"T", short:"trans"},
  "Undocumented Access": {initial:"U", short:"undoc"},
  "Identification and Residency Requirements": {initial:"I", short:"idres"},
  "Marginalized Access": {initial:"M", short:"marg"},
  "Privacy Guarantees": {initial:"P", short:"priv"}
}