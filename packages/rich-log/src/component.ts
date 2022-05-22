import { Text } from './text';
import { Group } from './group';
import { Table } from './table';
import { Fragment } from './fragment';
import { Box } from './box';
import { SVG } from './svg';

export type RichLogComponentLogResult = { type: 'log'; separate: boolean; text: string[]; styles: string[] };
export type RichLogGroupCollapsedResult = { type: 'groupCollapsed'; text: string[]; styles: string[] };
export type RichLogGroupEndResult = { type: 'groupEnd' };
export type RichLogTableResult = { type: 'table'; data: unknown[] | object };
export type RichLogFragmentResult = { type: 'fragment'; childrens: RichLogComponentResult[] };

export type RichLogComponentResult =
  | RichLogComponentLogResult
  | RichLogGroupCollapsedResult
  | RichLogGroupEndResult
  | RichLogTableResult
  | RichLogFragmentResult;

export type RichLogComponent<Props = {}, Result = RichLogComponentResult> = (props: Props) => Result;

export type JSXComponent = {
  type: Function | string;
  props: Record<string, unknown> & { children?: JSXComponent | JSXComponent[] };
};

const knownComponents: Function[] = [Text, Group, Table, Fragment, Box, SVG];

/** Determines if the component is a RichLog instance. */
export function isRichLogComponent(component: unknown): component is Function {
  if (
    !component ||
    typeof component === 'string' ||
    (typeof component === 'function' && !knownComponents.includes(component))
  ) {
    throw new Error('[RichLog] Only RichLog component can be used.');
  }

  return true;
}
