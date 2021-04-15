import { checkForURL } from "../src/client/js/nameChecker";

describe("Testing the URL Check functionality", () => {
  test("Testing the checkForURL() function", () => {
    const input = [
      "http://localhost:8080/",
      "https://www.bbc.com/news/uk-56761074",
      "some randome text",
      "www.youtube.com",
    ];
    const output = [false, true, false, true];

    input.forEach((element, index) => {
      expect(checkForURL(element)).toEqual(output[index]);
    });
  });
});
