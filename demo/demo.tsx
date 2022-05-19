import * as React from "react";
import { RichLogText } from "../src/text";
import { log } from "../src";

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
