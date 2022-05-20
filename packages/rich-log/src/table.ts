import type { RichLogComponent } from './component';

export type RichLogTableProps = {
  data: unknown[] | object;
};

export const Table: RichLogComponent<RichLogTableProps> = ({ data }) => {
  return {
    type: 'table',
    data,
  };
};
