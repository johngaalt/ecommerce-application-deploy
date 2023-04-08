import { createPetCard } from "../pet-card/pet-card";
import pets from "./pets.html";
import jennifer from "../../assets/images/pets-jennifer.png";
import katrine from "../../assets/images/pets-katrine.png";
import woody from "../../assets/images/pets-woody.png";

const petsArr = [
  { imgSrc: katrine, name: "Katrine" },
  { imgSrc: jennifer, name: "Jennifer" },
  { imgSrc: woody, name: "Woody" },
  { imgSrc: katrine, name: "Katrine" },
  { imgSrc: jennifer, name: "Jennifer" },
  { imgSrc: woody, name: "Woody" },
  { imgSrc: katrine, name: "Katrine" },
  { imgSrc: jennifer, name: "Jennifer" },
  { imgSrc: woody, name: "Woody" },
  { imgSrc: katrine, name: "Katrine" },
  { imgSrc: jennifer, name: "Jennifer" },
  { imgSrc: woody, name: "Woody" },
  { imgSrc: katrine, name: "Katrine" },
  { imgSrc: jennifer, name: "Jennifer" },
  { imgSrc: woody, name: "Woody" },
  { imgSrc: katrine, name: "Katrine" },
  { imgSrc: jennifer, name: "Jennifer" },
  { imgSrc: woody, name: "Woody" },
  { imgSrc: katrine, name: "Katrine" },
  { imgSrc: jennifer, name: "Jennifer" },
  { imgSrc: woody, name: "Woody" },
];

const petsElements = petsArr
  .map((elem) => createPetCard(elem.name, elem.imgSrc))
  .sort(() => 0.5 - Math.random());

function getImagePerSlide() {
  const screenWidth = document.body.clientWidth;
  switch (true) {
    case screenWidth <= 500:
      return 1;
    case screenWidth <= 860:
      return 2;
    default:
      return 3;
  }
}

function createSlide(cards) {
  return `<div class="slider__card" data-target="slider-card">${cards}</div>`;
}

const generateSlides = (cards) => {
  let imgPerSlide = getImagePerSlide();

  const slides = [];

  let i = 0;
  while (i < cards.length) {
    const cardsPartial = cards.slice(i, i + imgPerSlide).join("");
    const sliderCard = createSlide(cardsPartial);
    slides.push(sliderCard);

    i += imgPerSlide;
  }

  return slides.join("");
};
const slides = generateSlides(petsElements);
const petsWithCards = pets.replace("#PETS_CARDS#", slides);

export default petsWithCards;
