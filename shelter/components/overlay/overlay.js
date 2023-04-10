import { closeModal } from "../pop-up/pop-up";
import { createElementFromString } from "../../utils/create-element-from-string";
import overlay from "./overlay.html";

export function appendOverlay() {
  document.body.classList.add("body_hidden");
  document.body.appendChild(createElementFromString(overlay));

  requestAnimationFrame(() => {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("overlay_active");
  });
  addEventListenerOverlay();
}

function addEventListenerOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.addEventListener("click", closeModal);
}

export function hideOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.add("overlay_active");

  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 500);
}
