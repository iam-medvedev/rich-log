import type { StandardProperties } from "csstype";
import { paramCase } from "param-case";

/**
 * List of known css-properties
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/console
 * https://github.com/whatwg/console/issues/98#issuecomment-289338845
 * https://trac.webkit.org/browser/trunk/Source/WebInspectorUI/UserInterface/Views/ConsoleMessageView.js#L801
 */
const knownProperties = [
  "background",
  "border",
  "borderRadius",
  "boxShadow",
  "color",
  "cursor",
  "display",
  "font",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "fontFamily",
  "fontVariant",
  "lineHeight",
  "margin",
  "outline",
  "padding",
  "textTransform",
  "whiteSpace",
  "wordSpacing",
  "wordBreak",
] as const;

type KnownProperties = typeof knownProperties[number];

type RichLogStyles = Pick<StandardProperties, KnownProperties>;

type RichLogComponentProps = RichLogStyles & {
  children?: string;
};

// FIXME: null here is for compatibility with a ReactElement
type RichLogComponentReturnType = null;

export type RichLogComponent = (
  props: RichLogComponentProps
) => RichLogComponentReturnType;

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

  return cssArray.join("");
}

/** Generates strings for console fn */
export const generateComponentResult = (
  children: string,
  styles: RichLogStyles
) => {
  const css = generateCSS(styles);

  // FIXME: remove type casting
  return [`%c${children}`, css] as RichLogComponentReturnType;
};
