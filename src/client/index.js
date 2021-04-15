import { checkForURL } from "./js/nameChecker";
import { handleSubmit } from "./js/formHandler";
import { checkPolarity } from "./js/ploarityChecker";

import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

const btn = document.querySelector("#submit");

btn.addEventListener("click", (event) => handleSubmit(event));

export { checkForURL, handleSubmit, checkPolarity };
