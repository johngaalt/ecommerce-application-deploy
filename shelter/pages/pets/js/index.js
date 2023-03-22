import "../styles/style.scss";
// html
import footer from "../../../components/footer/footer.html";
import header from "../../../components/header/header.html";
// js
import petsList from "../../../components/pets-list/pets-list.js";
import headerContainer from "../../../components/header-container/header-container.js";
import { toggleActiveLinkNavigation } from "../../../components/utils/toggle-active-link-nav";

document.addEventListener("onload", toggleActiveLinkNavigation());

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = headerContainer + petsList + footer;
});
