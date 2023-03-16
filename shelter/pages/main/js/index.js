import "../styles/style.scss";
import footer from "../../../components/footer/footer.html";
import header from "../../../components/header/header.html";
import startScreen from "../../../components/start-screen/start-screen.html";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = startScreen + header + footer;
});
