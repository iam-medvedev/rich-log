import { Text } from './text';
import { Group } from './group';
import { GroupHeader } from './groupHeader';
import { Table } from './table';

export type RichLogComponentReturnType = null;

export type RichLogComponent<Props = {}> = (props: Props) => RichLogComponentReturnType;

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
    component.type === Text || component.type === Group || component.type === GroupHeader || component.type === Table;

  if (!isRichLogComponent) {
    throw new Error(errorText);
  }
}
