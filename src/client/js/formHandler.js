function handleSubmit(event) {
  event.preventDefault();

  document.getElementById("loading").innerHTML = "loading ...";

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  let checkURL = Client.checkForURL(formText);

  if (checkURL) {
    console.log("::: Form Submitted :::");
    // fetch("http://localhost:8081/test")
    fetch("https://evaluate-news-nlp-wepback.herokuapp.com/test")
      .then((res) => res.json())
      .then(async function (res) {
        console.log(res.key);
        const formdata = new FormData();
        formdata.append("key", res.key);
        formdata.append("url", formText);
        formdata.append("lang", res.lang);

        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        const response = await fetch(
          "https://api.meaningcloud.com/sentiment-2.1",
          requestOptions
        )
          .then(async (response) => ({
            status: response.status,
            body: await response.json(),
          }))
          .then(({ status, body }) => {
            console.log("status: ", status);
            console.log("body: ", body);
            return {
              status,
              body,
            };
          })
          .catch((error) => console.log("error", error));

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
