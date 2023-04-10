import { appendOverlay, hideOverlay } from "../overlay/overlay";

export function addEventListenerBurgerMenu() {
  const burger = document.querySelector(".burger");
  burger.addEventListener("click", toggleMenu);

  function toggleMenu() {
    if (burger) {
      const nav = document.querySelector(".nav");
      const links = nav.querySelectorAll(".list__item");
      const body = document.body;

      nav.classList.toggle("nav_active");
      burger.classList.toggle("burger_active");
      body.classList.toggle("body_hidden");

      if (nav.classList.contains("nav_active")) {
        appendOverlay();
        document.addEventListener("click", handleOutsideClick);
      } else {
        hideOverlay();
        document.removeEventListener("click", handleOutsideClick);
      }

      links.forEach((link) => {
        link.addEventListener("click", (event) => {
          if (event.target.tagName === "A") {
            nav.classList.remove("nav_active");
            burger.classList.remove("burger_active");
            body.classList.remove("body_hidden");

            hideOverlay();
            document.removeEventListener("click", handleOutsideClick);
          }
        });
      });
    }
  }

  function handleOutsideClick(event) {
    const nav = document.querySelector(".nav");
    const burger = document.querySelector(".burger");

    if (
      !event.target.closest(".nav") &&
      !event.target.closest(".burger") &&
      nav.classList.contains("nav_active")
    ) {
      nav.classList.remove("nav_active");
      burger.classList.remove("burger_active");
      document.body.classList.remove("body_hidden");
      hideOverlay();
      document.removeEventListener("click", handleOutsideClick);
    }
  }
}
