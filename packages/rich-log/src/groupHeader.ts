import type { RichLogComponent } from "./component";
import { generateStyledString, RichLogStyles } from "./styles";

type RichLogGroupHeaderProps = RichLogStyles & {
  children: string;
};

export const GroupHeader: RichLogComponent<RichLogGroupHeaderProps> = ({
  children,
  ...styles
}) => {
  return generateStyledString(children, styles) as null;
};
