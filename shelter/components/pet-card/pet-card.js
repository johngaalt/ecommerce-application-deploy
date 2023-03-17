import { createElementFromString } from "../utils/create-element-from-string";
import card from "./pet-card.html";

const cardElement = createElementFromString(card);
const elements = cardElement.querySelectorAll("[data-element]");
console.log(elements);
