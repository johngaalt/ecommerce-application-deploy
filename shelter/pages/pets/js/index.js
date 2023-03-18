import "../styles/style.scss";
// html
import footer from "../../../components/footer/footer.html";
import header from "../../../components/header/header.html";
// js
import pets from "../../../components/pets/pets.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = header + pets + footer;
});
