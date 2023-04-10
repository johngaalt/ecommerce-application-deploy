import popUp from "./pop-up.html";

export function createPetCardModal(pet) {
  const {
    imgSrc,
    name,
    type,
    breed,
    description,
    age,
    inoculations,
    diseases,
    parasites,
  } = pet;
  return popUp
    .replace("#NAME#", name)
    .replace("#IMAGE#", imgSrc)
    .replace("#TYPE#", breed)
    .replace("#DESCRIPTION#", description)
    .replace("#AGE#", age)
    .replace("#INOCULATIONS#", inoculations)
    .replace("#DISEASES#", diseases)
    .replace("#PARASITES#", parasites);
}
