import { createPetCard } from "../pet-card/pet-card";
import pets from "./pets.html";
import jennifer from "../../assets/images/pets-jennifer.png";
import katrine from "../../assets/images/pets-katrine.png";
import woody from "../../assets/images/pets-woody.png";

const petsArr = [
  { imgSrc: katrine, name: "Katrine" },
  { imgSrc: jennifer, name: "Jennifer" },
  { imgSrc: woody, name: "Woody" },
];

const petsElements = petsArr
  .map((elem) => createPetCard(elem.name, elem.imgSrc))
  .join("");

const petsWithCards = pets.replace("#PETS_CARDS#", petsElements);

export default petsWithCards;
