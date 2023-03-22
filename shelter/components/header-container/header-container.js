import header from "../header/header.html";
import headerContainer from "./header-container.html";

const headerContainerWithHeader = headerContainer.replace("#HEADER#", header);
export default headerContainerWithHeader;
