import { createHelpIcon } from "../help-icon/help-icon";
import help from "./help.html";
import food from "../../assets/icons/icon-pet-food.svg";
import transportation from "../../assets/icons/icon-transportation.svg";
import toys from "../../assets/icons/icon-toys.svg";
import bowlAndCups from "../../assets/icons/icon-bowls-and-cups.svg";
import shampoos from "../../assets/icons/icon-shampoos.svg";
import vitamines from "../../assets/icons/icon-vitamins.svg";
import medicines from "../../assets/icons/icon-medicines.svg";
import collarsAndLeashes from "../../assets/icons/icon-collars-leashes.svg";
import sleepingArea from "../../assets/icons/icon-sleeping-area.svg";

const iconArr = [
  { imgSrc: food, name: "Pet food" },
  { imgSrc: transportation, name: "Transportation" },
  { imgSrc: toys, name: "Toys" },
  { imgSrc: bowlAndCups, name: "Bowls and cups" },
  { imgSrc: shampoos, name: "Shampoos" },
  { imgSrc: vitamines, name: "Vitamins" },
  { imgSrc: medicines, name: "Medicines" },
  { imgSrc: collarsAndLeashes, name: "Collars / leashes" },
  { imgSrc: sleepingArea, name: "Sleeping areas" },
];

const iconElements = iconArr
  .map((elem) => createHelpIcon(elem.name, elem.imgSrc))
  .join("");

const icons = help.replace("#ICON_CARDS#", iconElements);

export default icons;
