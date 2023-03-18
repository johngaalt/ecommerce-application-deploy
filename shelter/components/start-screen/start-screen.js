import header from "../header/header.html";
import startScreen from "./start-screen.html";

const startScreenWithHeader = startScreen.replace("#HEADER#", header);
export default startScreenWithHeader;
