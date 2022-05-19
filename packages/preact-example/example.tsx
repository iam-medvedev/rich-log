import { render } from "preact";
import { useState } from "preact/compat";
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

  return (
    <>
      <h1>React Example</h1>

      <button onClick={sendTextLog}>Send log with styled text</button>

      {isClicked ? (
        <p>
          <i>See the output in the console</i>
        </p>
      ) : null}
    </>
  );
}

render(<App />, document.getElementById("root"));
