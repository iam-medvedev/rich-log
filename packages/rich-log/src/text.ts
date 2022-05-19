import type { RichLogComponent } from "./component";
import { generateStyledString, RichLogStyles } from "./styles";

type RichLogTextProps = RichLogStyles & {
  children: string;
};

export const Text: RichLogComponent<RichLogTextProps> = ({
  children,
  ...styles
}) => {
  console.log(...generateStyledString(children, styles));

  return null;
};
