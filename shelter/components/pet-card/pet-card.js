import card from "./pet-card.html";

export function createPetCard(name, image) {
  return card.replaceAll("#PET_NAME#", name).replace("#PET_IMAGE#", image);
}
