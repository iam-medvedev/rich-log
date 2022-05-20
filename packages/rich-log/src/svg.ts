import type { StandardProperties } from 'csstype';
import { RichLogComponent } from './component';
import { generateStyledString } from './styles';

export type RichgLogSVGProps = {
  width: StandardProperties['width'];
  height: StandardProperties['height'];
  value?: string;
  separate?: boolean;
};

export const SVG: RichLogComponent<RichgLogSVGProps> = ({ separate = false, value, width, height }) => {
  // TODO: parse <svg> instead of using raw svg
  const svgDataUrl = `data:image/svg+xml;base64,${window.btoa(value)}`;

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
