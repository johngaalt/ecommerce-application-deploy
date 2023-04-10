import { createPetCard } from "../pet-card/pet-card";
import {
  addEventListenerCloseButton,
  appendPetCardModal,
  createPetCardModal,
} from "../pop-up/pop-up";
import pets from "./pets.html";
import jennifer from "../../assets/images/pets-jennifer.png";
import katrine from "../../assets/images/pets-katrine.png";
import woody from "../../assets/images/pets-woody.png";
import sophia from "../../assets/images/pets-sophia.png";
import timmy from "../../assets/images/pets-timmy.png";
import charley from "../../assets/images/pets-charly.png";
import scarlett from "../../assets/images/pets-scarlet.png";
import freddie from "../../assets/images/pets-freddie.png";
import { appendOverlay } from "../overlay/overlay";

const petsArr = [
  {
    imgSrc: katrine,
    name: "Katrine",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    age: "6 months",
    inoculations: ["panleukopenia"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    imgSrc: jennifer,
    name: "Jennifer",
    type: "Dog",
    breed: "Labrador",
    description:
      "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: "2 months",
    inoculations: ["none"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    imgSrc: woody,
    name: "Woody",
    type: "Dog",
    breed: "Golden Retriever",
    description:
      "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    age: "3 years 6 months",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["right back leg mobility reduced"],
    parasites: ["none"],
  },
  {
    imgSrc: sophia,
    name: "Sophia",
    type: "Dog",
    breed: "Shih tzu",
    description:
      "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: "1 month",
    inoculations: ["parvovirus"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    imgSrc: timmy,
    name: "Timmy",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    age: "2 years 3 months",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
    diseases: ["kidney stones"],
    parasites: ["none"],
  },
  {
    imgSrc: charley,
    name: "Charly",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    age: "8 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["deafness", "blindness"],
    parasites: ["lice", "fleas"],
  },
  {
    imgSrc: scarlett,
    name: "Scarlett",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    age: "3 months",
    inoculations: ["parainfluenza"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    imgSrc: freddie,
    name: "Freddie",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    age: "2 months",
    inoculations: ["rabies"],
    diseases: ["none"],
    parasites: ["none"],
  },
];

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
