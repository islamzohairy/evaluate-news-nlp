import { checkPolarity } from "../src/client/js/ploarityChecker";

describe("Testing the check polarity functionality", () => {
  test("Testing the checkPolarity() function", () => {
    const input = [
      "P+",
      "P",
      "NEU",
      "N",
      "N+",
      "NONE",
      "random text",
      undefined,
      null,
      0,
    ];
    const output = [
      "Strong positive",
      "Positive",
      "Neutral",
      "Negative",
      "Strong negative",
      "Without polarity",
      "Without polarity",
      "Without polarity",
      "Without polarity",
      "Without polarity",
    ];

    input.forEach((element, index) => {
      expect(checkPolarity(element)).toEqual(output[index]);
    });
  });
});
