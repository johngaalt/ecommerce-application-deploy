export function createElementFromString(str) {
  const div = document.createElement("div");
  div.innerHTML = str;
  return div.firstChild;
}
