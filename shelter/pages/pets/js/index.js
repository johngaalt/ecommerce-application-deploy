import "../styles/style.scss";
// html
import footer from "../../../components/footer/footer.html";
// js
import petsList from "../../../components/pets-list/pets-list.js";
import headerContainer from "../../../components/header-container/header-container.js";
import { toggleActiveLinkNavigation } from "../../../utils/toggle-active-link-nav";
import { addEventListenerBurgerMenu } from "../../../components/burger-menu/burger-menu";
import { addEventListenerPets } from "../../../components/pets/pets";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = headerContainer + petsList + footer;
  toggleActiveLinkNavigation();
  addEventListenerBurgerMenu();
  addEventListenerPets();
});
