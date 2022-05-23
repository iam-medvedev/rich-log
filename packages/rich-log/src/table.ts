import type { RichLogComponent, RichLogTableResult } from './component';

export type RichLogTableProps = {
  data: unknown[] | object;
};

export const Table: RichLogComponent<RichLogTableProps, RichLogTableResult> = async ({ data }) => {
  return {
    type: 'table',
    data,
  };
};
