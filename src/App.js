import "./App.css";
import { useState, useRef } from "react";
import FloatKeyboard from "./FloatKeyboard/FloatKeyboard";

function App() {
  const [currentInput, setCurrentInput] = useState([]);
  const keyboardRef = useRef();

  const setCurrentActiveInput = (evt) => {
    keyboardRef.current.showKeyboard(evt.currentTarget.value);
    setCurrentInput(evt.currentTarget);
  };

  const changeInput = (data) => (currentInput.value = data);

  return (
    <div className="App">
      <p>
        <label htmlFor="name">First Name: </label>
        <input
          type="text"
          onFocus={setCurrentActiveInput}
          name="name"
          className={currentInput.name == "name"? "onFocus" : ""}
          autoComplete="off"
        />
      </p>
      <p>
        <label htmlFor="last">Last Name: </label>
        <input
          type="text"
          onFocus={setCurrentActiveInput}
          name="last"
          className={currentInput.name == "last"? "onFocus" : ""}
          autoComplete="off"
        />
      </p>
      <p>
        <label htmlFor="email">E-mail: </label>
        <input
          type="text"
          onFocus={setCurrentActiveInput}
          name="email"
          className={currentInput.name == "email"? "onFocus" : ""}
          autoComplete="off"
        />
      </p>
      <FloatKeyboard ref={keyboardRef} getKeyDown={changeInput} />
    </div>
  );
}

export default App;
