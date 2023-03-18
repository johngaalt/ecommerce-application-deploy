import { createPetCard } from "../pet-card/pet-card";
import pets from "./pets.html";
import jennifer from "../../assets/images/pets-jennifer.png";

const petsArr = [
  { imgSrc: jennifer, name: "Jennifer" },
  { imgSrc: jennifer, name: "ohbuib" },
  { imgSrc: jennifer, name: "iyugiug" },
];

const petsElements = petsArr
  .map((elem) => createPetCard(elem.name, elem.imgSrc))
  .join("");

const petsWithCards = pets.replace("#PETS_CARDS#", petsElements);

export default petsWithCards;
