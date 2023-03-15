import "../styles/style.scss";
import footer from "../../../components/footer/footer.html";
import header from "../../../components/header/header.html";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = header + footer;
});
