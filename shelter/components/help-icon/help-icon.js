import helpIcon from "./help-icon.html";

export function createHelpIcon(name, image) {
  return helpIcon.replace("#ICON_NAME#", name).replace("#ICON_IMAGE#", image);
}
