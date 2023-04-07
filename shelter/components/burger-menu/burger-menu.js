export function addEventListenerBurgerMenu() {
  const burger = document.querySelector(".burger");

  function toggleMenu() {
    if (burger) {
      const nav = document.querySelector(".nav");
      const links = document.querySelectorAll(".list__item");
      const body = document.body;

      nav.classList.toggle("nav_active");
      burger.classList.toggle("burger_active");
      body.classList.toggle("body_hidden");

      links.forEach((link) => {
        link.addEventListener("click", (event) => {
          if (event.target.tagName === "A") {
            nav.classList.remove("nav_active");
            burger.classList.remove("burger_active");
            body.classList.remove("body_hidden");
          }
        });
      });
    }
  }

  burger.addEventListener("click", toggleMenu);
}
