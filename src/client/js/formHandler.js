async function handleSubmit(event) {
  event.preventDefault();

  const loading = document.getElementById("loading");
  const polarity = document.getElementById("polarity");
  const confidence = document.getElementById("confidence");
  const url = document.getElementById("url").checked;
  let inputType = null;
  let checkURL = false;

  url === true ? (inputType = "url") : (inputType = "txt");
  loading.innerHTML = "loading ...";
  confidence.innerHTML = "";
  polarity.innerHTML = "";

  // check what text was put into the form field
  let formText = await document.getElementById("name").value;
  console.log(formText);
  if (url === true) {
    checkURL = await Client.checkForURL(formText);
  }

  if ((checkURL === true && url === true) || url === false) {
    console.log("::: Form Submitted :::");
    const requestOptions = {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formText, inputType }),
    };

    await fetch(
      "https://evaluate-news-nlp-wepback.herokuapp.com/analyze",
      // "http://localhost:8081/analyze",
      requestOptions
    )
      .then((res) => res.json())
      .then(async (response) => {
        console.log(response);
        if (response.status.code !== "0") {
          loading.innerHTML = response.status.msg + " " + "🙁";
          confidence.innerHTML = "";
          polarity.innerHTML = "";
        } else {
          if (response.score_tag) {
            let checkPolarity = await Client.checkPolarity(response.score_tag);
            polarity.innerHTML = checkPolarity;
          }

          if (response.confidence) {
            confidence.innerHTML = response.confidence + "%";
          }

          loading.innerHTML = "✔️";
        }
      })
      .catch((e) => {
        console.log(e);
        loading.innerHTML = "Something wrong happened! ⚠️";
        confidence.innerHTML = "";
        polarity.innerHTML = "";
      });
  } else {
    loading.innerHTML = "Please, enter a valid url! 🔗";
  }
}

export { handleSubmit };
