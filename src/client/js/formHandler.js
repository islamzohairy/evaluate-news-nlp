function handleSubmit(event) {
  event.preventDefault();

  document.getElementById("loading").innerHTML = "loading ...";

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  let checkURL = Client.checkForURL(formText);

  if (checkURL) {
    console.log("::: Form Submitted :::");
        const requestOptions = {
          method: "POST",
          body: {
            formText
          },
          headers: {
            'Content-Type': 'application/json'
          }
        };

        await fetch(
          "https://evaluate-news-nlp-wepback.herokuapp.com/test",
          requestOptions
        )
        .then((response) => {
          console.log(response)
          if (response.body.status.code !== "0") {
            document.getElementById("loading").innerHTML =
              response.body.status.msg + " " + "🙁";
            document.getElementById("confidence").innerHTML = "";
            document.getElementById("polarity").innerHTML = "";
          } else {
            if (response.body.score_tag) {
              let polarity = await Client.checkPolarity(response.body.score_tag);
              document.getElementById("polarity").innerHTML = polarity;
            }
  
            if (response.body.confidence) {
              let { confidence } = response.body;
              document.getElementById("confidence").innerHTML = confidence;
            }
  
            document.getElementById("loading").innerHTML = "😀";
  
            // document.getElementById("polarity").innerHTML = "polarity";
            // document.getElementById("confidence").innerHTML = "confidence";
          }
        })
      .catch((e) => {
        console.log(e);
        document.getElementById("loading").innerHTML =
          "Something happened wrong ⚠️";
        document.getElementById("confidence").innerHTML = "";
        document.getElementById("polarity").innerHTML = "";
      });
  } else {
    document.getElementById("loading").innerHTML = "Please, enter a valid url!";
  }
}

export { handleSubmit };
