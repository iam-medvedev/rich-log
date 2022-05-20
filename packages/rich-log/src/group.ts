import { JSXComponent, RichLogComponent, validateRichLogComponent } from './component';
import { Fragment } from './fragment';

export type RichLogGroupProps = {
  header: JSXComponent;
  children: JSXComponent | JSXComponent[];
};

export const Group: RichLogComponent<RichLogGroupProps> = ({ header, children }) => {
  validateRichLogComponent(header);
  const result = Fragment({ children });

  if (result.type !== 'fragment') {
    throw new Error('[RichLog] Only Fragment should be used as Group content');
  }

  return {
    type: 'fragment',
    childrens: [{ ...header.type(header.props), type: 'groupCollapsed' }, ...result.childrens, { type: 'groupEnd' }],
  };
};
