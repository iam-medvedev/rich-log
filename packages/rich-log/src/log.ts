import { JSXComponent, RichLogComponentResult, validateRichLogComponent } from './component';

function generateLog(item: RichLogComponentResult) {
  switch (item.type) {
    case 'groupCollapsed':
      console.groupCollapsed(item.text.join(''), ...item.styles);
      break;

    case 'log':
      console.log(item.text.join(''), ...item.styles);
      break;

    case 'groupEnd':
      console.groupEnd();
      break;

    case 'table':
      console.table(item.data);
      break;

    case 'fragment':
      for (const children of item.childrens) {
        generateLog(children);
      }
      break;

    default:
      break;
  }
}

/** Rich Log */
export function log(content: JSXComponent) {
  validateRichLogComponent(content);

  const result = content.type(content.props);
  generateLog(result);
}
