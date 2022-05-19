import { Text } from "./text";
import { Group } from "./group";
import { GroupHeader } from "./groupHeader";

export type RichLogComponentReturnType = null;

export type RichLogComponent<Props = {}> = (
  props: Props
) => RichLogComponentReturnType;

export type JSXComponent = {
  type: Function;
  props: Object;
};

/** Determines if the component is a RichLog instance. */
export function validateRichLogComponent(component: JSXComponent) {
  const isRichLogComponent =
    component.type === Text ||
    component.type === Group ||
    component.type === GroupHeader;

  if (!isRichLogComponent) {
    throw new Error("[RichLog] Only RichLog component can be used.");
  }
}
