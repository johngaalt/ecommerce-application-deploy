export function toggleActiveLinkNavigation() {
  const isPetsPage = window.location.pathname.includes("pets");
  const petsLink = document.querySelector(".pets-page");
  const mainLink = document.querySelector(".main-page");

  if (isPetsPage) {
    petsLink.classList.add("active-link");
    petsLink.classList.remove("fancy-hover");
  } else {
    mainLink.classList.add("active-link");
    mainLink.classList.remove("fancy-hover");
  }
}
