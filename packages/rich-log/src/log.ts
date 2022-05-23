import { JSXComponent, RichLogComponentResult, isRichLogComponent } from './component';

async function generateLog(item: RichLogComponentResult) {
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
        await generateLog(children);
      }
      break;

    default:
      break;
  }
}

/** Rich Log */
export async function log(content: JSXComponent) {
  if (isRichLogComponent(content.type)) {
    const result = await content.type(content.props);
    await generateLog(result);
  }
}
