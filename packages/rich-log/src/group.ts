import {
  JSXComponent,
  RichLogComponent,
  isRichLogComponent,
  RichLogComponentLogResult,
  RichLogFragmentResult,
} from './component';
import { Fragment } from './fragment';

export type RichLogGroupProps = {
  header: JSXComponent;
  children: JSXComponent | JSXComponent[];
};

export const Group: RichLogComponent<RichLogGroupProps, RichLogFragmentResult> = async ({ header, children }) => {
  const headerResult: RichLogComponentLogResult = isRichLogComponent(header.type)
    ? await header.type(header.props)
    : {
        type: 'log',
        text: [''],
        styles: [''],
        separate: false,
      };

  const result = await Fragment({ children });

  if (result.type !== 'fragment') {
    throw new Error('[RichLog] Only Fragment should be used as Group content');
  }

  return {
    type: 'fragment',
    childrens: [{ ...headerResult, type: 'groupCollapsed' }, ...result.childrens, { type: 'groupEnd' }],
  };
};
