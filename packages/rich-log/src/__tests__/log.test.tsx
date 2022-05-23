import nock from 'nock';
import RichLog from '../';

jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(async function (blob: Blob) {
  const buffer = Buffer.from(await blob.arrayBuffer());
  const base64url = `data:${blob.type};base64,${buffer.toString('base64')}`;

  this.onload({
    target: {
      result: base64url,
    },
  });
});

const text = 'hello world';
const styles = {
  color: 'green',
  background: '#000',
  borderRadius: '8px',
};

const compiledText = `%c${text}`;
const compiledStyles = `color: ${styles.color}; background: ${styles.background}; border-radius: ${styles.borderRadius};`;

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

beforeAll(() => {
  nock('http://example.img').get('/test.png').replyWithFile(200, `${__dirname}/test.png`, {
    'Content-Type': 'image/png',
  });
});

it('Text', async () => {
  await RichLog.log(<RichLog.Text {...styles}>{text}</RichLog.Text>);

  expect(logMock).toBeCalledTimes(1);
  expect(logMock).toBeCalledWith(compiledText, compiledStyles);
});

it('Fragment + Text (multiple)', async () => {
  await RichLog.log(
    <RichLog.Fragment>
      <RichLog.Text {...styles}>{text}</RichLog.Text>
      <RichLog.Text {...styles}>{text}</RichLog.Text>
    </RichLog.Fragment>,
  );

  expect(logMock).toBeCalledTimes(1);
  expect(logMock).toBeCalledWith(`${compiledText}${compiledText}`, compiledStyles, compiledStyles);
});

it('Fragment + Text (first separate)', async () => {
  await RichLog.log(
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

it('Fragment + Text (second separate)', async () => {
  await RichLog.log(
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

it('Group + Text', async () => {
  await RichLog.log(
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

it('Table', async () => {
  const data = [
    { type: 'Boolean', value: true },
    { type: 'String', value: 'string' },
    { type: 'Number', value: 1 },
    { type: 'Object', value: { test: 'object test' } },
  ];
  await RichLog.log(<RichLog.Table data={data} />);
  expect(tableMock).toBeCalledWith(data);
});

it('SVG', async () => {
  await RichLog.log(
    <RichLog.SVG height="60px" width="60px">
      <svg
        xmlns="http://www.w3.org/2000/svg"
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
      </svg>
    </RichLog.SVG>,
  );

  expect(logMock).toBeCalledWith(
    '%c ',
    "font-size: 1px; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBzdHJva2U9IndoaXRlIiBzdHJva2VXaWR0aD0iMiIgZmlsbD0ibm9uZSIgc3Ryb2tlTGluZWNhcD0icm91bmQiIHN0cm9rZUxpbmVqb2luPSJyb3VuZCI+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJNMTAuMjkgMy44NkwxLjgyIDE4YTIgMiAwIDAgMCAxLjcxIDNoMTYuOTRhMiAyIDAgMCAwIDEuNzEtM0wxMy43MSAzLjg2YTIgMiAwIDAgMC0zLjQyIDB6Ij48L3BhdGg+PGxpbmUgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4MT0iMTIiIHkxPSI5IiB4Mj0iMTIiIHkyPSIxMyI+PC9saW5lPjxsaW5lIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeDE9IjEyIiB5MT0iMTciIHgyPSIxMi4wMSIgeTI9IjE3Ij48L2xpbmU+PC9zdmc+'); background-size: contain; background-position: center center; background-repeat: no-repeat; padding-top: 60px; padding-right: 60px;",
  );
});

it('Img', async () => {
  await RichLog.log(<RichLog.Img height="60px" width="60px" src="http://example.img/test.png" />);

  expect(logMock).toBeCalledWith(
    '%c ',
    `font-size: 1px; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=='); background-size: contain; background-position: center center; background-repeat: no-repeat; padding-top: 60px; padding-right: 60px;`,
  );
});
