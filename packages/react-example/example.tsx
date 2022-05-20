import { useState } from 'react';
import { createRoot } from 'react-dom/client';
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

  return (
    <>
      <h1>React Example</h1>

      <button onClick={sendTextLog}>Send styled console.log</button>
      <button onClick={sendGroupLog}>Send styled console.group</button>
      <button onClick={sendTableLog}>Send console.table</button>

      {isClicked ? (
        <p>
          <i>See the output in the console</i>
        </p>
      ) : null}
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
