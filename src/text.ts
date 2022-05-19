import { generateComponentResult, RichLogComponent } from "./styles";

export const RichLogText: RichLogComponent = ({ children, ...styles }) => {
  return generateComponentResult(children, styles);
};
