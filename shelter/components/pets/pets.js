import { createPetCard } from "../pet-card/pet-card";
import {
  addEventListenerCloseButton,
  appendPetCardModal,
} from "../pop-up/pop-up";
import pets from "./pets.html";

import { appendOverlay } from "../overlay/overlay";
import { petsArr } from "../../constants/pets";

const petsElements = petsArr
  .map((elem) => createPetCard(elem.name, elem.imgSrc))
  .map((elem) => createSlide(elem))
  .sort(() => 0.5 - Math.random())
  .join("");

function createSlide(card) {
  return `<div class="slider__card" data-target="slider-card">${card}</div>`;
}

export function addEventListenerPets() {
  const pets = document.getElementById("pets");

  pets.addEventListener("click", (event) => {
    const targetPetCard = event.target.closest("[data-name]");
    if (targetPetCard) {
      const { name } = targetPetCard.dataset;
      const selectedPet = petsArr.find((element) => element.name === name);
      if (selectedPet) {
        appendOverlay();
        appendPetCardModal(selectedPet);
        addEventListenerCloseButton();
      }
    }
  });
}

const petsWithCards = pets.replace("#PETS_CARDS#", petsElements);
export default petsWithCards;
