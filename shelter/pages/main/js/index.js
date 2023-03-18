import "../styles/style.scss";
// html
import footer from "../../../components/footer/footer.html";
import about from "../../../components/about/about.html";
import help from "../../../components/help/help.html";
//  js
import startScreen from "../../../components/start-screen/start-screen.js";
import pets from "../../../components/pets/pets.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = startScreen + about + pets + help + footer;
});
