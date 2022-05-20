import type { RichLogComponent } from './component';
import { generateStyledString, RichLogStyles } from './styles';
import { getIntVal, isSafari } from './utils';

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

  if (isSafari()) {
    // Styling a Box in Safari is a little tricky
    result.fontSize = '1px';

    for (const key in styles) {
      if (key === 'width') {
        result['paddingRight'] = `${getIntVal(styles[key])}px`;
      } else if (key === 'height') {
        result['lineHeight'] = styles[key];
      } else {
        result[key] = styles[key];
      }
    }
  } else {
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
  }

  return result;
}

export const Box: RichLogComponent<RichLogBoxProps> = ({ separate = false, ...objectStyles }) => {
  const { text, styles } = generateStyledString(' ', prepareBoxStyles(objectStyles));

  return {
    type: 'log',
    text: [text],
    styles: [styles],
    separate,
  };
};
