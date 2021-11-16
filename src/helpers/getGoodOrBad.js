export const getGoodOrBad = (textInput) => {
  if (textInput === "good" || textInput === "bad") return textInput;

  const text = typeof(textInput) === "string" ? textInput.toLowerCase() : textInput;

  
  if (text === "open and accessible") return "good";
  if (text === "closed doors") return "bad";

  if (text === "strong") return "good";
  if (text === "weak") return "bad";

  if (text === "complete") return "good";
  if (text === "incomplete") return "bad";

  if (text === "better") return "good";
  if (text === "worse") return "bad";

  if (text === "above") return "good";
  if (text === "below") return "bad";

  if (text === "confused") return "neutral";

  return textInput;
}