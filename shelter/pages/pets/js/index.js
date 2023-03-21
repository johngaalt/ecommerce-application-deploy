import "../styles/style.scss";
// html
import footer from "../../../components/footer/footer.html";
import header from "../../../components/header/header.html";
// js
import petsList from "../../../components/pets-list/pets-list.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = header + petsList + footer;
});
