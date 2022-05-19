import type { RichLogComponent } from "./component";

type RichLogTableProps = {
  data: any[] | object;
};

export const Table: RichLogComponent<RichLogTableProps> = ({ data }) => {
  console.table(data);

  return null;
};
