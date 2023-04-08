// alert("ATTENTION! html font-size: 10px");
import "../styles/style.scss";
// html
import footer from "../../../components/footer/footer.html";
import about from "../../../components/about/about.html";
import donation from "../../../components/donation/donation.html";
//  js
import help from "../../../components/help/help.js";
import startScreen from "../../../components/start-screen/start-screen.js";
import pets from "../../../components/pets/pets.js";
import { toggleActiveLinkNavigation } from "../../../components/utils/toggle-active-link-nav";
import { addEventListenerBurgerMenu } from "../../../components/burger-menu/burger-menu";
import { runSlider } from "../../../components/slider/slider";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML =
    startScreen + about + pets + help + donation + footer;

  toggleActiveLinkNavigation();
  addEventListenerBurgerMenu();
  runSlider();
});
