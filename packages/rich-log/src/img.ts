import { RichLogComponent, RichLogComponentLogResult } from './component';
import { generateStyledString, RichLogStyles } from './styles';
import { getBase64Image } from './utils';

const knownProperties = [
  'backgroundPosition',
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

export type RichLogImgStyles = Pick<RichLogStyles, KnownProperties>;

export type RichgLogImgProps = RichLogImgStyles & {
  separate?: boolean;
  src: string;
};

export const Img: RichLogComponent<RichgLogImgProps, RichLogComponentLogResult> = async ({
  separate = false,
  src,
  width,
  height,
  ...stylesObject
}) => {
  let str: string;
  try {
    str = await getBase64Image(src);
  } catch (e) {
    console.error(e);
    throw new Error(`[RichLog] Cannot get image from: ${src}`);
  }

  const { text, styles } = generateStyledString(' ', {
    fontSize: '1px',
    backgroundImage: `url('${str}')`,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    paddingTop: height,
    paddingRight: width,
    ...stylesObject,
  });

  return {
    type: 'log',
    text: [text],
    styles: [styles],
    separate,
  };
};
