import { rgb, copy } from 'd3-color'
import { UndocSimple, IdresSimple, MargSimple, TransSimple, PrivSimple  } from '../icons'


export const colors = {
  positive: '#2A9D8F',
  negative: '#E76F51',
  neutral: '#DDD',
  highlight: '#E9C46A',
  // highlight: '#FFFFFF',
  border: '#D4D4D5'
}

export const getColor = (value) => {
  if (value === "") return colors.neutral
  else if (value > 0) return colors.positive
  else if (value <= 0) return colors.negative
  else return colors.neutral
}

export const getBackgroundColor = (value) => {
  if (value === "") return rgb(colors.neutral).copy({opacity:.3})
  // rgba(42,157,143,0.3)
  else if (value > 0) return rgb(colors.positive).copy({opacity:.3})
  // rgba(231,111,81,0.3)
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
  fillOpacity: 0.6
}

export const medianBar = {
  height: questionBar.height/4,
  y: questionBar.y + questionBar.height,
}

export const medianMarker = {
  width: 40,
  height: medianBar.height*2,
  // fontSize: medianBar.height*2
  fontSize: '0.7em'
}

export const paddings = {
  mainMap: 10,
  mapChartBorder: 20,
  mapChartInBetween: .15,
  scoreCardQuestionBarPercentage: 1.0,
  scoreCardQuestionLabelPadding: questionBar.height*2.5,
  scoreCardMediaLabelPadding: questionBar.height*.5,
  waterfallChartBorder: 20,
  waterfallChartInBetween: .5
}

export const scoreCardCircleRadii = {
  answer: questionBar.height/2,
  median: questionBar.height/6
}

export const questionExtents = {
  individualMax: 2
}

export const hexCatTextLabels = {
  r: 8,
  catLength: {
    "Policy Transparency": 135,
    "Undocumented Access": 150,
    "Identification and Residency Requirements": 270,
    "Marginalized Access": 140,
    "Privacy Guarantees": 130
  }
}

export const iconInfo = {
  strokeWidth: 0.5
}

export const quoteInfo = {
  numWords: 20
}

const getIcon = (iconName,iconType) => (x,y,size,fillPrimary,sizeModifier) => {
  const sizeNew = sizeModifier === "big" ? size*2 : size;
  if (iconType === "simple") {
    const getIconComponent = (iconName) => {
      if (iconName === 'idres') 
        return <IdresSimple
          fillPrimary={fillPrimary}
          strokeWidth={iconInfo.strokeWidth}
        />
      else if (iconName === 'marg') 
        return <MargSimple
          fillPrimary={fillPrimary}
          strokeWidth={iconInfo.strokeWidth}
        />
      else if (iconName === 'priv') 
        return <PrivSimple
          fillPrimary={fillPrimary}
          strokeWidth={iconInfo.strokeWidth}
        />
      else if (iconName === 'trans') 
        return <TransSimple
          fillPrimary={fillPrimary}
          strokeWidth={iconInfo.strokeWidth}
        />
      else if (iconName === 'undoc') 
        return <UndocSimple
          fillPrimary={fillPrimary}
          strokeWidth={iconInfo.strokeWidth}
        />
    }
    return <svg
        // xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox={"0 0 "+(size)+" "+(size)}
        style = {{ width: "100%", height:"100%"}}
        className={"simpleIcon"}
        width={sizeNew+"pt"}
        height={sizeNew+"pt"}
        preserveAspectRatio={"xMinYMin meet"}
        x={x}
        y={y}
      >
        {
          getIconComponent(iconName)
        }
      </svg>
  }
}

export const catInitials = {
  "Policy Transparency": {
    initial:"T", 
    short:"trans", 
    iconSimple: getIcon("trans","simple")
  },
  "Undocumented Access": {
    initial:"U", 
    short:"undoc", 
    iconSimple: getIcon("undoc","simple")
  },
  "Identification and Residency Requirements": {
    initial:"I", 
    short:"idres", 
    iconSimple: getIcon("idres","simple")
  },
  "Marginalized Access": {
    initial:"M", 
    short:"marg", 
    iconSimple: getIcon("marg","simple")
  },
  "Privacy Guarantees": {
    initial:"P", 
    short:"priv", 
    iconSimple: getIcon("priv","simple")
  }
}

export const comparisonInfo = {
  opacity: 0.2,
  r: 6,
  charge: -3,
  strength: 0.6,
  size: 20,
  fixedHeight: 350,
  fontSize: "0.7em",
  forceCollideMultipleBig: 1.6,
  forceCollideMultipleSmall: 0.6,
  widthCutOffForLabels: 500
}