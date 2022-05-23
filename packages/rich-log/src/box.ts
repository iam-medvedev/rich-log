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

function prepareBoxStyles(styles: RichLogBoxStyles): RichLogStyles {
  const result: RichLogStyles = {};

  // TODO: not working in safari
  result.fontSize = '1px';
  for (const key in styles) {
    if (key === 'width') {
      result['paddingRight'] = styles[key];
    } else if (key === 'height') {
      result['lineHeight'] = styles[key];
    } else {
      result[key] = styles[key];
    }
  }

  return result;
}

export const Box: RichLogComponent<RichLogBoxProps> = async ({ separate = false, ...objectStyles }) => {
  const { text, styles } = generateStyledString(' ', prepareBoxStyles(objectStyles));

  return {
    type: 'log',
    text: [text],
    styles: [styles],
    separate,
  };
};
