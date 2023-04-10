import popUp from "./pop-up.html";
import { createElementFromString } from "../utils/create-element-from-string";

export function createPetCardModal(pet) {
  const {
    imgSrc,
    name,
    type,
    breed,
    description,
    age,
    inoculations,
    diseases,
    parasites,
  } = pet;
  return popUp
    .replace("#NAME#", name)
    .replace("#IMAGE#", imgSrc)
    .replace("#TYPE#", breed)
    .replace("#DESCRIPTION#", description)
    .replace("#AGE#", age)
    .replace("#INOCULATIONS#", inoculations)
    .replace("#DISEASES#", diseases)
    .replace("#PARASITES#", parasites);
}

export function closeModal() {
  const overlay = document.getElementById("overlay");
  const modalWindow = document.getElementById("container-modal");

  if (overlay && modalWindow) {
    modalWindow.classList.add("modal_active");

    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.removeChild(modalWindow);
      document.body.classList.remove("body_hidden");
    }, 500);
  }
}

export function addEventListenerCloseButton() {
  const closeButton = document.querySelector(".container-modal__cross");
  closeButton.addEventListener("click", closeModal);
}

export function removeScrollBar() {
  const body = document.body;
  body.classList.toggle("body_hidden");
}

export function appendPetCardModal(selectedPet) {
  const targetedCard = createPetCardModal(selectedPet);
  document.body.appendChild(createElementFromString(targetedCard));

  requestAnimationFrame(() => {
    const modal = document.getElementById("container-modal");
    modal.classList.remove("modal_active");
  });
}
