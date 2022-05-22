import type { RichLogComponent, RichLogComponentLogResult } from './component';
import { generateStyledString, RichLogStyles } from './styles';

export type RichLogTextProps = RichLogStyles & {
  children: string;
  separate?: boolean;
};

export const Text: RichLogComponent<RichLogTextProps, RichLogComponentLogResult> = ({
  children,
  separate = false,
  ...objectStyles
}) => {
  const { text, styles } = generateStyledString(children, objectStyles);

  return {
    type: 'log',
    text: [text],
    styles: [styles],
    separate,
  };
};
