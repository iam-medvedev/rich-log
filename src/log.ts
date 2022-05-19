import { RichLogText } from "./text";

type JSXComponent = {
  type: Function;
  props: Object;
};

/** Determines if the component is a RichLog instance. */
function isRichLogComponent(component: JSXComponent) {
  return component.type === RichLogText;
}

/** Creates a RichLog instance. */
function logger(type: "log" | "error" | "info", content: JSXComponent) {
  if (!isRichLogComponent(content)) {
    throw new Error("[RichLog] Only RichLog component can be used.");
  }

  const result = content.type(content.props);
  console[type](...result);
}

/** Rich Log */
export function log(content: JSXComponent) {
  return logger("log", content);
}

/** Rich Info */
export function info(content: JSXComponent) {
  return logger("info", content);
}

/** Rich Error */
export function error(content: JSXComponent) {
  return logger("error", content);
}
