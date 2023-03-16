import header from "../header/header.html";
import { createElementFromString } from "../utils/create-element-from-string";
import startScreen from "./start-screen.html";

const startScreenElem = createElementFromString(startScreen);
const headerDiv = startScreenElem.querySelector("#header");
headerDiv.innerHTML = header;

export default startScreenElem.innerHTML;
