import type { RichLogComponent } from "./component";

type RichLogTableProps = {
  data: unknown[] | object;
};

export const Table: RichLogComponent<RichLogTableProps> = ({ data }) => {
  console.table(data);

  return null;
};
