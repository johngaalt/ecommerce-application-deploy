export function addEventListenerBurgerMenu() {
  const burger = document.querySelector(".burger");

  function toggleMenu() {
    if (burger) {
      const nav = document.querySelector(".nav");
      nav.classList.toggle("nav_active");
      burger.classList.toggle("burger_active");
    }
  }

  burger.addEventListener("click", toggleMenu);
}
