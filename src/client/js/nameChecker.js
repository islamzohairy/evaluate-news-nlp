function checkForURL(inputText) {
  console.log("::: Running checkForURL :::", inputText);

  let regex = /^(www\.|http(s)?:\/\/)[a-z A-Z 0-9]*\..*$/i;
  let result = regex.test(inputText);

  return result;
}

export { checkForURL };
