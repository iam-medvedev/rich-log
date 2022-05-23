import type { JSXComponent } from './component';

const xmlns = 'http://www.w3.org/2000/svg';
const skipPropsKeys = ['children', 'xmlns'];

/** Generates html element from JSX object  */
export function parseJSX(component: JSXComponent, returnElement?: false): string;
export function parseJSX(component: JSXComponent, returnElement?: true): Element;
export function parseJSX(component: JSXComponent, returnElement = false): Element | string {
  if (typeof component.type === 'string') {
    const element = document.createElementNS(xmlns, component.type);
    element.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');

    for (const key in component.props) {
      if (!skipPropsKeys.includes(key)) {
        element.setAttributeNS(xmlns, key, String(component.props[key]));
      }
    }

    if (component.props.children) {
      const childrens = Array.isArray(component.props.children) ? component.props.children : [component.props.children];
      for (const child of childrens) {
        element.appendChild(parseJSX(child, true));
      }
    }

    return returnElement ? element : element.outerHTML;
  }
}
