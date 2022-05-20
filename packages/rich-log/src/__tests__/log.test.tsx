/**
 * @jest-environment jsdom
 */
import RichLog from '../';

const logMock = jest.fn();
const tableMock = jest.fn();
const groupCollapsedMock = jest.fn();
const groupEndMock = jest.fn();

global.console = {
  ...global.console,
  log: logMock,
  table: tableMock,
  groupCollapsed: groupCollapsedMock,
  groupEnd: groupEndMock,
};

beforeEach(() => {
  logMock.mockReset();
  tableMock.mockReset();
  groupCollapsedMock.mockReset();
  groupEndMock.mockReset();
});

const text = 'hello world';
const styles = {
  color: 'green',
  background: '#000',
  borderRadius: '8px',
};

const compiledText = `%c${text}`;
const compiledStyles = `color: ${styles.color}; background: ${styles.background}; border-radius: ${styles.borderRadius};`;

it('Text', () => {
  RichLog.log(<RichLog.Text {...styles}>{text}</RichLog.Text>);

  expect(logMock).toBeCalledTimes(1);
  expect(logMock).toBeCalledWith(compiledText, compiledStyles);
});

it('Fragment + Text (multiple)', () => {
  RichLog.log(
    <RichLog.Fragment>
      <RichLog.Text {...styles}>{text}</RichLog.Text>
      <RichLog.Text {...styles}>{text}</RichLog.Text>
    </RichLog.Fragment>,
  );

  expect(logMock).toBeCalledTimes(1);
  expect(logMock).toBeCalledWith(`${compiledText}${compiledText}`, compiledStyles, compiledStyles);
});

it('Fragment + Text (first separate)', () => {
  RichLog.log(
    <RichLog.Fragment>
      <RichLog.Text {...styles} separate>
        {text}
      </RichLog.Text>
      <RichLog.Text {...styles}>{text}</RichLog.Text>
    </RichLog.Fragment>,
  );

  expect(logMock).toBeCalledTimes(2);
  expect(logMock).toHaveBeenNthCalledWith(1, compiledText, compiledStyles);
  expect(logMock).toHaveBeenNthCalledWith(2, compiledText, compiledStyles);
});

it('Fragment + Text (second separate)', () => {
  RichLog.log(
    <RichLog.Fragment>
      <RichLog.Text {...styles}>{text}</RichLog.Text>
      <RichLog.Text {...styles} separate>
        {text}
      </RichLog.Text>
    </RichLog.Fragment>,
  );

  expect(logMock).toBeCalledTimes(2);
  expect(logMock).toHaveBeenNthCalledWith(1, compiledText, compiledStyles);
  expect(logMock).toHaveBeenNthCalledWith(2, compiledText, compiledStyles);
});

it('Group + Text', () => {
  RichLog.log(
    <RichLog.Group header={<RichLog.Text {...styles}>{text}</RichLog.Text>}>
      <RichLog.Text {...styles}>{text}</RichLog.Text>
      <RichLog.Text {...styles}>{text}</RichLog.Text>
    </RichLog.Group>,
  );

  expect(groupCollapsedMock).toBeCalledTimes(1);
  expect(groupCollapsedMock).toBeCalledWith(compiledText, compiledStyles);
  expect(logMock).toBeCalledWith(`${compiledText}${compiledText}`, compiledStyles, compiledStyles);
  expect(groupEndMock).toBeCalledTimes(1);
});

it('Table', () => {
  const data = [
    { type: 'Boolean', value: true },
    { type: 'String', value: 'string' },
    { type: 'Number', value: 1 },
    { type: 'Object', value: { test: 'object test' } },
  ];
  RichLog.log(<RichLog.Table data={data} />);
  expect(tableMock).toBeCalledWith(data);
});

it('SVG', () => {
  RichLog.log(
    <RichLog.SVG
      height="60px"
      width="60px"
      value='<svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>'
    />,
  );

  expect(logMock).toBeCalledWith(
    '%c ',
    "font-size: 1px; background-image: url('data:image/svg+xml;base64,PHN2ZwogICAgICAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICAgICAgICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgICAgICAgICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgICAgICAgICB3aWR0aD0iMjQiCiAgICAgICAgICBoZWlnaHQ9IjI0IgogICAgICAgICAgc3Ryb2tlPSJ3aGl0ZSIKICAgICAgICAgIHN0cm9rZVdpZHRoPSIyIgogICAgICAgICAgZmlsbD0ibm9uZSIKICAgICAgICAgIHN0cm9rZUxpbmVjYXA9InJvdW5kIgogICAgICAgICAgc3Ryb2tlTGluZWpvaW49InJvdW5kIgogICAgICAgID4KICAgICAgICAgIDxwYXRoIGQ9Ik0xMC4yOSAzLjg2TDEuODIgMThhMiAyIDAgMCAwIDEuNzEgM2gxNi45NGEyIDIgMCAwIDAgMS43MS0zTDEzLjcxIDMuODZhMiAyIDAgMCAwLTMuNDIgMHoiPjwvcGF0aD4KICAgICAgICAgIDxsaW5lIHgxPSIxMiIgeTE9IjkiIHgyPSIxMiIgeTI9IjEzIj48L2xpbmU+CiAgICAgICAgICA8bGluZSB4MT0iMTIiIHkxPSIxNyIgeDI9IjEyLjAxIiB5Mj0iMTciPjwvbGluZT4KICAgICAgICA8L3N2Zz4='); background-size: contain; background-position: center center; background-repeat: no-repeat; padding-top: 60px; padding-right: 60px;",
  );
});
