import type { StandardProperties } from 'csstype';
import { JSXComponent, RichLogComponent, RichLogComponentLogResult } from './component';
import { parseJSX } from './jsx';
import { generateStyledString } from './styles';

export type RichgLogSVGProps = {
  width: StandardProperties['width'];
  height: StandardProperties['height'];
  separate?: boolean;
  children: JSXComponent;
};

export const SVG: RichLogComponent<RichgLogSVGProps, RichLogComponentLogResult> = ({
  separate = false,
  children,
  width,
  height,
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
  });

  return {
    type: 'log',
    text: [text],
    styles: [styles],
    separate,
  };
};
