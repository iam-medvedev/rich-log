import { JSXComponent, RichLogComponent, RichLogComponentResult, validateRichLogComponent } from './component';

export type RichLogFragmentProps = {
  children?: JSXComponent | JSXComponent[];
};

export const Fragment: RichLogComponent<RichLogFragmentProps> = ({ children }) => {
  const result: RichLogComponentResult[] = [];

  /** Merge multiple logs */
  function pushItems(item: RichLogComponentResult) {
    if (item.type !== 'log' || item.separate) {
      result.push(item);
      return;
    }

    const lastItem = result[result.length - 1];
    if (!lastItem || lastItem.type !== 'log' || lastItem.separate) {
      result.push(item);
      return;
    }

    lastItem.text.push(...item.text);
    lastItem.styles.push(...item.styles);
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      validateRichLogComponent(child);
      pushItems(child.type(child.props));
    }
  } else {
    validateRichLogComponent(children);
    pushItems(children.type(children.props));
  }

  return {
    type: 'fragment',
    childrens: result,
  };
};
