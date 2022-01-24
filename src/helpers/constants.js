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

export const scoreThresholds  = {
  "overall": 0.5,
  "Policy Transparency": 1,
  "Undocumented Access": -5.5,
  "Identification and Residency Requirements": 0.5,
  "Marginalized Access": 0.75,
  "Privacy Guarantees": 0
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
    iconSimple: getIcon("trans","simple"),
    range: ["Opaque","Transparent"]
  },
  "Undocumented Access": {
    initial:"U", 
    short:"undoc", 
    iconSimple: getIcon("undoc","simple"),
    range: ["Closed Door","Open and Accessible"]
  },
  "Identification and Residency Requirements": {
    initial:"I", 
    short:"idres", 
    iconSimple: getIcon("idres","simple"),
    range: ["Opaque","Transparent"]
  },
  "Marginalized Access": {
    initial:"M", 
    short:"marg", 
    iconSimple: getIcon("marg","simple"),
    range: ["Exclusionary","Inclusive"]
  },
  "Privacy Guarantees": {
    initial:"P", 
    short:"priv", 
    iconSimple: getIcon("priv","simple"),
    range: ["Opaque","Transparent"]
  }
}

export const comparisonInfo = {
  opacity: 0.2,
  r: 6,
  charge: 0,
  strength: 5,
  size: 20,
  fixedHeight: (verticalOrientation) => verticalOrientation ? 600 : 350,
  fontSize: "0.7em",
  forceCollideMultipleBig: 1.6,
  forceCollideMultipleSmall: 0.6,
  forceCollideMultipleScatter: 0.2,
  widthCutOffForLabels: 500,
  positiveXVal: 1.4,
  negativeXVal: -1.4,
  neutralXVal: 0,
  paddingSides: 40,
  axesColor: "rgba(0,0,0,0.7)",
  gridColor: "rgba(255,255,255,0.8)"
}

export const scoreCardText = {
  "Policy Transparency": "Policy Transparency evaluates government efforts to make national vaccine policies available to the public.  We determined whether an official vaccine strategy is online, whether the government has made public statements explaining the strategy, whether the budget is public, who was involved in developing the strategy and finally whether undocumented people were part of the process.",
  "Undocumented Access": "Undocumented Access addresses the central question of the scorecard: are undocumented people able to access vaccination against COVID-19? This is where researchers identified whether undocumented people are included in the language of both written and oral vaccination policies, whether undocumented people can access vaccination without an ID, and whether access is equitable: undocumented people able to get vaccinated on the same basis as regularly residing individuals, and the type and choice of vaccine, costs and prioritisation are the same.",
  "Identification and Residency Requirements": "Identification and Residency Requirements is an indirect means to determine whether the undocumented are able to get vaccinated. Researchers evaluated whether national vaccination policies are explicit in the type of documentation that is needed to access the vaccine, both in terms of identification and residency.",
  "Marginalized Access": "Marginalised Access attempts to evaluate how a country is accommodating the needs of other marginalized groups within its borders.  The scorecard evaluates policies towards people in detention centres or without freedom of movement, people who are not fluent in the local language, people without internet access or means of transportation and people who are housing insecure. We evaluated how these groups are addressed overall, with the understanding  that undocumented people may also be part of these groups.",
  "Privacy Guarantees": "Privacy Guarantees evaluates policies related to the collection, processing and sharing of data.  Researchers evaluated whether these policies are publicly available and whether assurances are provided that data collected prior to and during vaccination will not be shared outside health authorities. Undocumented people often avoid accessing public services out of fear that their residency status will be reported to government authorities. Privacy guarantees are therefore critical to making vaccines accessible. Lastly, researchers measured whether the certificate of vaccination indicates the location where the vaccination took place, with the understanding that this may create additional barriers for undocumented people if they seek to move to another country undetected."
}


// export const iconsPathPrefix = "https://rawcdn.githack.com/Lighthouse-Reports/Vaccinating-Undoc-Microsite/be6fb6f6db2795b3b556f0d2f8924c798da1c02a/public/icons/"
export const iconsPathPrefix = "https://rawcdn.githack.com/Lighthouse-Reports/Vaccinating-Undoc-Microsite/f2621bee9ac7d2ca58ec654b7c6bff9c676965ff/public/icons/"
export const logoPathPrefix = "https://rawcdn.githack.com/Lighthouse-Reports/Vaccinating-Undoc-Microsite/20cf331d54c7ab9402cfa93f1155294effbfb248/public/logo-brand.svg"
// export const logoPathPrefix = "https://www.lighthousereports.nl/wp-content/themes/lhr/assets/images/logo-text.svg"
