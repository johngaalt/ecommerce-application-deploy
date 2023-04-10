import { closeModal } from "../pop-up/pop-up";
import { createElementFromString } from "../utils/create-element-from-string";
import overlay from "./overlay.html";

export function appendOverlay() {
  document.body.appendChild(createElementFromString(overlay));
  addEventListenerOverlay();
}

function addEventListenerOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.addEventListener("click", closeModal);
}
