import "../styles/style.scss";
import footer from "../../../components/footer/footer.html";
import startScreen from "../../../components/start-screen/start-screen.js";
import about from "../../../components/about/about.html";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = startScreen + about + footer;
});
