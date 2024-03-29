const checkPolarity = (res) => {
  let result = null;

  switch (res) {
    case "P+":
      result = "Strong positive";
      break;

    case "P":
      result = "Positive";
      break;

    case "NEU":
      result = "Neutral";
      break;

    case "N":
      result = "Negative";
      break;

    case "N+":
      result = "Strong negative";
      break;

    case "NONE":
      result = "Without polarity";
      break;

    default:
      result = "Without polarity";
  }

  return result;
};

export { checkPolarity };
