import { formatLocale } from 'd3-format';

export const numberLocales = {
  'en': formatLocale({
      decimal: ".",
      thousands: ",",
      grouping: [3]
    }),
  'el': formatLocale({
    decimal: ",",
    thousands: ".",
    grouping: [3] 
    })
}
