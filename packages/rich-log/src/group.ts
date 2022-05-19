import {
  JSXComponent,
  RichLogComponent,
  validateRichLogComponent,
} from "./component";

type RichLogGroupProps = {
  header: JSXComponent;
  children?: JSXComponent | JSXComponent[];
};

export const Group: RichLogComponent<RichLogGroupProps> = ({
  header,
  children,
}) => {
  validateRichLogComponent(header);

  console.groupCollapsed(...header.type(header.props));

  if (Array.isArray(children)) {
    for (const child of children) {
      validateRichLogComponent(child);
      child.type(child.props);
    }
  }

  console.groupEnd();

  return null;
};
