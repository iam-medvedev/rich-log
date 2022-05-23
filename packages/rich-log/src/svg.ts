import type { RichLogImgStyles } from './img';
import { JSXComponent, RichLogComponent, RichLogComponentLogResult } from './component';
import { parseJSX } from './jsx';
import { generateStyledString } from './styles';

export type RichgLogSVGProps = RichLogImgStyles & {
  separate?: boolean;
  children: JSXComponent;
};

export const SVG: RichLogComponent<RichgLogSVGProps, RichLogComponentLogResult> = async ({
  separate = false,
  children,
  width,
  height,
  ...stylesObject
}) => {
  const rawSvg = parseJSX(children);
  const svgDataUrl = `data:image/svg+xml;base64,${window.btoa(rawSvg)}`;

  const { text, styles } = generateStyledString(' ', {
    fontSize: '1px',
    backgroundImage: `url('${svgDataUrl}')`,
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
