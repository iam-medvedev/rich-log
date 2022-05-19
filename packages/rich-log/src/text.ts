import { generateComponentResult, RichLogComponent } from "./styles";

export const Text: RichLogComponent = ({ children, ...styles }) => {
  return generateComponentResult(children, styles);
};
