import { Text } from './text';
import { Group } from './group';
import { Table } from './table';
import { Fragment } from './fragment';

export type RichLogComponentResult =
  | { type: 'log'; separate: boolean; text: string[]; styles: string[] }
  | { type: 'groupCollapsed'; text: string[]; styles: string[] }
  | { type: 'groupEnd' }
  | { type: 'table'; data: unknown[] | object }
  | { type: 'fragment'; childrens: RichLogComponentResult[] };

export type RichLogComponent<Props = {}> = (props: Props) => RichLogComponentResult;

export type JSXComponent = {
  type: Function;
  props: Object;
};

/** Determines if the component is a RichLog instance. */
export function validateRichLogComponent(component?: JSXComponent) {
  const errorText = '[RichLog] Only RichLog component can be used.';

  if (!component) {
    throw new Error(errorText);
  }

  const isRichLogComponent =
    component.type === Text || component.type === Group || component.type === Table || component.type === Fragment;

  if (!isRichLogComponent) {
    throw new Error(errorText);
  }
}
