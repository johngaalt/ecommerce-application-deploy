import { createElementFromString } from "../utils/create-element-from-string";
import overlay from "./overlay.html";

export function appendOverlay() {
  document.body.appendChild(createElementFromString(overlay));
}
