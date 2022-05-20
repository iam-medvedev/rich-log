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
const compiledStyles = `color: ${styles.color};background: ${styles.background};border-radius: ${styles.borderRadius};`;

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
