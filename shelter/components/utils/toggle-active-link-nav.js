const currentPath = window.location.pathname;

const mainLink = document.querySelector(".main-page");
const petsLink = document.querySelector(".pets-page");

export function toggleActiveLinkNavigation() {
  if (currentPath === "./index.html") {
    mainLink.classList.add("active-link");
    mainLink.classList.remove("fancy-hover");
  } else if (currentPath === "./pets.html") {
    petsLink.classList.add("active-link");
    petsLink.classList.remove("fancy-hover");
  }
}

toggleActiveLinkNavigation();
