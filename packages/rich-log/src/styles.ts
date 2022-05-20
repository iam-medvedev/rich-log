import type { StandardProperties } from 'csstype';
import { paramCase } from 'param-case';

/**
 * List of known css-properties
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/console
 * https://github.com/whatwg/console/issues/98#issuecomment-289338845
 * https://trac.webkit.org/browser/trunk/Source/WebInspectorUI/UserInterface/Views/ConsoleMessageView.js#L801
 */
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
  'color',
  'cursor',
  'display',
  'font',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'height',
  'lineHeight',
  'margin',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'outline',
  'padding',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'textTransform',
  'textShadow',
  'whiteSpace',
  'width',
  'wordBreak',
  'wordSpacing',
] as const;

type KnownProperties = typeof knownProperties[number];

export type RichLogStyles = Pick<StandardProperties, KnownProperties>;

/** Determines if a property is known to us */
function isKnownProperty(item: string): item is KnownProperties {
  return knownProperties.includes(item as KnownProperties);
}

/** Generates CSS-string from object */
function generateCSS(styles: RichLogStyles) {
  const cssArray: string[] = [];

  for (const key in styles) {
    if (isKnownProperty(key)) {
      const cssProp = paramCase(key);
      cssArray.push(`${cssProp}: ${styles[key]};`);
    }
  }

  return cssArray.join(' ');
}

/** Generates strings for console fn */
export const generateStyledString = (children: string, stylesObject: RichLogStyles) => {
  const styles = generateCSS(stylesObject);

  return {
    text: `%c${children}`,
    styles,
  };
};
