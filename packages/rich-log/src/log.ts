import { JSXComponent, validateRichLogComponent } from './component';

/** Rich Log */
export function log(content: JSXComponent) {
  validateRichLogComponent(content);

  content.type(content.props);
}
