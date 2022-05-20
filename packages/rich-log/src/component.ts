import { Text } from './text';
import { Group } from './group';
import { Table } from './table';
import { Fragment } from './fragment';
import { Box } from './box';
import { SVG } from './svg';

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

const knownComponents: Function[] = [Text, Group, Table, Fragment, Box, SVG];

/** Determines if the component is a RichLog instance. */
export function validateRichLogComponent(component?: JSXComponent) {
  const errorText = '[RichLog] Only RichLog component can be used.';

  if (!component) {
    throw new Error(errorText);
  }

  if (!knownComponents.includes(component.type)) {
    throw new Error(errorText);
  }
}
