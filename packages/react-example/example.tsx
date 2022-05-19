import * as React from "react";
import { RichLogText } from "../rich-log/src/text";
import { log } from "../rich-log/src";

log(
  <RichLogText
    color="green"
    fontSize="20px"
    fontFamily="monospace"
    background="black"
  >
    hello world!!
  </RichLogText>
);
