import { petsArr } from "../../constants/pets";
import { createPetCard } from "../pet-card/pet-card";
import pets from "../pets-list/pets-list.html";

const petsElements = petsArr
  .map((elem) => createPetCard(elem.name, elem.imgSrc))
  .join("");

const petsWithCards = pets.replace("#PETS_CARDS#", petsElements);

export default petsWithCards;
