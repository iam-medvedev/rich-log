import { log } from './log';
import { Text, RichLogTextProps } from './text';
import { Group, RichLogGroupProps } from './group';
import { Table, RichLogTableProps } from './table';
import { Fragment, RichLogFragmentProps } from './fragment';

type RichLogProxyComponent<Props> = (props: Props) => null;

const RichLog = {
  log,

  Text: Text as RichLogProxyComponent<RichLogTextProps>,
  Group: Group as RichLogProxyComponent<RichLogGroupProps>,
  Table: Table as RichLogProxyComponent<RichLogTableProps>,
  Fragment: Fragment as RichLogProxyComponent<RichLogFragmentProps>,
};

export default RichLog;
