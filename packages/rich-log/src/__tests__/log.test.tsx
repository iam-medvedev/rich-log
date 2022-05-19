import RichLog from "../";

const logMock = jest.fn();
const tableMock = jest.fn();
const groupCollapsedMock = jest.fn();

global.console = {
  ...global.console,
  log: logMock,
  table: tableMock,
  groupCollapsed: groupCollapsedMock,
};

beforeEach(() => {
  logMock.mockReset();
  tableMock.mockReset();
  groupCollapsedMock.mockReset();
});

it("calls console.log", () => {
  const text = "hello world";
  const styles = {
    color: "green",
    background: "#000",
    borderRadius: "8px",
  };

  RichLog.log(<RichLog.Text {...styles}>{text}</RichLog.Text>);
  expect(logMock).toBeCalledWith(
    `%c${text}`,
    `color: ${styles.color};background: ${styles.background};border-radius: ${styles.borderRadius};`
  );
});

it("calls console.groupCollapsed", () => {
  const text = "header";
  const styles = {
    color: "green",
    background: "#000",
    borderRadius: "8px",
  };

  RichLog.log(
    <RichLog.Group
      header={<RichLog.GroupHeader {...styles}>{text}</RichLog.GroupHeader>}
    >
      <RichLog.Text {...styles}>{text}</RichLog.Text>
    </RichLog.Group>
  );

  const expectedStyles = `color: ${styles.color};background: ${styles.background};border-radius: ${styles.borderRadius};`;
  expect(groupCollapsedMock).toBeCalledWith(`%c${text}`, expectedStyles);
  expect(logMock).toBeCalledWith(`%c${text}`, expectedStyles);
});

it("calls console.table", () => {
  const data = [
    { type: "Boolean", value: true },
    { type: "String", value: "string" },
    { type: "Number", value: 1 },
    { type: "Object", value: { test: "object test" } },
  ];
  RichLog.log(<RichLog.Table data={data} />);
  expect(tableMock).toBeCalledWith(data);
});
