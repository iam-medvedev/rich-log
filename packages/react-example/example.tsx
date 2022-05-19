import { useState } from "react";
import { createRoot } from "react-dom/client";
import RichLog from "rich-log";

function App() {
  const [isClicked, setIsClicked] = useState(false);

  function sendTextLog() {
    setIsClicked(true);

    RichLog.log(
      <RichLog.Text
        color="green"
        fontSize="20px"
        fontFamily="monospace"
        background="black"
      >
        Hello world. This is styled text.
      </RichLog.Text>
    );
  }

  function sendGroupLog() {
    setIsClicked(true);

    RichLog.log(
      <RichLog.Group
        header={
          <RichLog.GroupHeader
            color="green"
            fontSize="20px"
            fontFamily="monospace"
            background="black"
          >
            Collapsed group
          </RichLog.GroupHeader>
        }
      >
        <RichLog.Text
          color="green"
          fontSize="20px"
          fontFamily="monospace"
          background="black"
        >
          I'am log in group
        </RichLog.Text>
        <RichLog.Text
          color="green"
          fontSize="20px"
          fontFamily="monospace"
          background="black"
        >
          Here is the next line
        </RichLog.Text>
      </RichLog.Group>
    );
  }

  return (
    <>
      <h1>React Example</h1>

      <button onClick={sendTextLog}>Send styled console.log</button>
      <button onClick={sendGroupLog}>Send styled console.group</button>

      {isClicked ? (
        <p>
          <i>See the output in the console</i>
        </p>
      ) : null}
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
