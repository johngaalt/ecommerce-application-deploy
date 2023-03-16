import "../styles/style.scss";
import footer from "../../../components/footer/footer.html";
import startScreen from "../../../components/start-screen/start-screen.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = startScreen + footer;
});
