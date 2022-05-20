import type { RichLogComponent } from './component';
import { generateStyledString, RichLogStyles } from './styles';

const knownProperties = [
  'background',
  'backgroundColor',
  'backgroundImage',
  'backgroundPosition',
  'backgroundRepeat',
  'backgroundSize',
  'border',
  'borderRadius',
  'boxShadow',
  'cursor',
  'height',
  'margin',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'width',
] as const;

type KnownProperties = typeof knownProperties[number];

type RichLogBoxStyles = Pick<RichLogStyles, KnownProperties>;
export type RichLogBoxProps = RichLogBoxStyles & {
  separate?: boolean;
};

// TODO: в сафари не работает
function getWidth(val: string | number) {
  const width = typeof val === 'number' ? val : parseInt(val);
  const minWidth = 7;
  const newWidth = Math.max(0, width - minWidth);

  return `${newWidth}px`;
}

function prepareBoxStyles(styles: RichLogBoxStyles): RichLogStyles {
  const result = {
    fontSize: '1px',
  };

  for (const key in styles) {
    switch (key) {
      case 'width':
        result['paddingRight'] = getWidth(styles[key]);
        break;
      case 'height':
        result['lineHeight'] = styles[key];
        break;

      default:
        result[key] = styles[key];
        break;
    }
  }

  return result;
}

export const Box: RichLogComponent<RichLogBoxProps> = ({ separate = false, ...objectStyles }) => {
  const { text, styles } = generateStyledString(' ', prepareBoxStyles(objectStyles));
  console.log({ text, styles });

  return {
    type: 'log',
    text: [text],
    styles: [styles],
    separate,
  };
};
