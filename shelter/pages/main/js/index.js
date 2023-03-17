import "../styles/style.scss";
import footer from "../../../components/footer/footer.html";
import startScreen from "../../../components/start-screen/start-screen.js";
import about from "../../../components/about/about.html";
import pets from "../../../components/pets/pets.html";
import petCard from "../../../components/pet-card/pet-card.html";
import help from "../../../components/help/help.html";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML =
    startScreen + about + pets + petCard + help + footer;
});
