import { JSXComponent, validateRichLogComponent } from "./component";

/** Creates a RichLog instance. */
function logger(type: "log" | "error" | "info", content: JSXComponent) {
  validateRichLogComponent(content);

  content.type(content.props);
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
