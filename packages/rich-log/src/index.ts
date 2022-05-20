import { log } from './log';
import { Text, RichLogTextProps } from './text';
import { Group, RichLogGroupProps } from './group';
import { Table, RichLogTableProps } from './table';
import { Fragment, RichLogFragmentProps } from './fragment';
import { Box, RichLogBoxProps } from './box';
import { SVG, RichgLogSVGProps } from './svg';

type RichLogProxyComponent<Props> = (props: Props) => null;

const RichLog = {
  log,

  Text: Text as RichLogProxyComponent<RichLogTextProps>,
  Group: Group as RichLogProxyComponent<RichLogGroupProps>,
  Table: Table as RichLogProxyComponent<RichLogTableProps>,
  Fragment: Fragment as RichLogProxyComponent<RichLogFragmentProps>,
  Box: Box as RichLogProxyComponent<RichLogBoxProps>,
  SVG: SVG as RichLogProxyComponent<RichgLogSVGProps>,
};

export default RichLog;
