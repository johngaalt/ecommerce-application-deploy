import { createPetCard } from "../pet-card/pet-card";
import pets from "./pets.html";
import jennifer from "../../assets/images/pets-jennifer.png";
import katrine from "../../assets/images/pets-katrine.png";
import woody from "../../assets/images/pets-woody.png";
import sophia from "../../assets/images/pets-sophia.png";
import timmy from "../../assets/images/pets-timmy.png";
import charley from "../../assets/images/pets-charly.png";
import scarlett from "../../assets/images/pets-scarlet.png";
import freddie from "../../assets/images/pets-freddie.png";

const petsArr = [
  { imgSrc: katrine, name: "Katrine" },
  { imgSrc: jennifer, name: "Jennifer" },
  { imgSrc: woody, name: "Woody" },
  { imgSrc: sophia, name: "Sophia" },
  { imgSrc: timmy, name: "Timmy" },
  { imgSrc: charley, name: "Charly" },
  { imgSrc: scarlett, name: "Scarlett" },
  { imgSrc: freddie, name: "Freddie" },
];

const petsElements = petsArr
  .map((elem) => createPetCard(elem.name, elem.imgSrc))
  .map((elem) => createSlide(elem))
  .sort(() => 0.5 - Math.random())
  .join("");

function createSlide(card) {
  return `<div class="slider__card" data-target="slider-card">${card}</div>`;
}

const petsWithCards = pets.replace("#PETS_CARDS#", petsElements);

export default petsWithCards;
