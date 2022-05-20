import { render } from 'preact';
import { useState } from 'preact/compat';
import RichLog from 'rich-log';

function App() {
  const [isClicked, setIsClicked] = useState(false);

  function sendTextLog() {
    setIsClicked(true);

    RichLog.log(
      <RichLog.Fragment>
        <RichLog.Text color="green" fontSize="20px" fontFamily="monospace" background="black">
          Hello world.
        </RichLog.Text>
        <RichLog.Text color="white" fontSize="15px" fontFamily="monospace" background="black" borderRadius="8px">
          This is styled text.
        </RichLog.Text>
      </RichLog.Fragment>,
    );
  }

  function sendGroupLog() {
    setIsClicked(true);

    RichLog.log(
      <RichLog.Group
        header={
          <RichLog.Text color="green" fontSize="20px" fontFamily="monospace" background="black">
            Collapsed group
          </RichLog.Text>
        }
      >
        <RichLog.Text color="green" fontSize="20px" fontFamily="monospace" background="black">
          I'am log in group
        </RichLog.Text>
        <RichLog.Box background="green" borderRadius="50%" width="20px" height="20px" separate />
        <RichLog.Text color="green" fontSize="20px" fontFamily="monospace" background="black">
          Here is the next line
        </RichLog.Text>
      </RichLog.Group>,
    );
  }

  function sendTableLog() {
    RichLog.log(
      <RichLog.Table
        data={[
          { type: 'Boolean', value: true },
          { type: 'String', value: 'string' },
          { type: 'Number', value: 1 },
          { type: 'Object', value: { test: 'object test' } },
        ]}
      />,
    );
  }

  function sendSVG() {
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
  }

  return (
    <>
      <h1>React Example</h1>

      <button onClick={sendTextLog}>Send styled console.log</button>
      <button onClick={sendGroupLog}>Send styled console.group</button>
      <button onClick={sendSVG}>Send console.log with SVG-icon</button>
      <button onClick={sendTableLog}>Send console.table</button>

      {isClicked ? (
        <p>
          <i>See the output in the console</i>
        </p>
      ) : null}
    </>
  );
}

render(<App />, document.getElementById('root'));
