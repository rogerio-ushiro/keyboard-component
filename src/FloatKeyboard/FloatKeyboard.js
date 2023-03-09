import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import "./FloatKeyboard.css";

const FloatKeyboard = forwardRef((props, ref) => {
  const { getKeyDown } = props;
  const [capsActive, setCapsActive] = useState(false);
  const [shiftActive, setShiftActive] = useState(false);
  const [enable, setEnable] = useState(false);
  const [data, setData] = useState([]);

  useImperativeHandle(ref, () => ({
    showKeyboard(currentInputValue) {
      setData(currentInputValue);
      setEnable(true);
    },
  }));

  useEffect(() => {
    getKeyDown(data);
  }, [data, getKeyDown]);

  const send = (evt) => {
    const inputKey = evt.currentTarget.id;
    switch (inputKey) {
      case "esc":
        setTimeout(() => {
          setEnable(false)
        }, 200);
        break;
        case "tab":
          setData((data) => data + "\t");
          break;
      case "enter":
        setData((data) => data + "\n");
        break;
      case "back":
        setData(data.slice(0, data.length - 1));
        break;
        case "caps":
          setCapsActive((capsActive) => !capsActive);
          break;
      case "shift":
        setShiftActive((shiftActive) => !shiftActive);
        break;
      case "space":
        setData((data) => data + " ");
        break;
      case "combr":
        setData((data) =>
          capsActive || shiftActive 
            ? data + ".COM.BR".toUpperCase()
            : data + ".COM.BR".toLowerCase()
        );
        setShiftActive(false);
        break;
      case "com":
        setData((data) =>
          capsActive || shiftActive ? data + ".COM".toUpperCase() : data + ".COM".toLowerCase()
        );
        setShiftActive(false);
        break;
      default:
        setData((data) =>
          capsActive || shiftActive 
            ? data + inputKey.toUpperCase()
            : data + inputKey.toLowerCase()
        );
        setShiftActive(false);
        break;
    }
  };

  return (
    <>
    <div className={`kb-bg1  ${enable ? "kb-bg1-active" : ""}`}></div>
    <div className={`kb-bg2  ${enable ? "kb-bg2-active" : ""}`}></div>
      <div className={`keyboard ${enable ? "keyboard-active" : ""}`}>
        <ul className="row row-0">
          <li onClick={send} id="esc">ESC</li>
          <li onClick={send} id="1">1</li>
          <li onClick={send} id="2">2</li>
          <li onClick={send} id="3">3</li>
          <li onClick={send} id="4">4</li>
          <li onClick={send} id="5">5</li>
          <li onClick={send} id="6">6</li>
          <li onClick={send} id="7">7</li>
          <li onClick={send} id="8">8</li>
          <li onClick={send} id="9">9</li>
          <li onClick={send} id="10">0</li>
          <li onClick={send} id="-">-</li>
          <li onClick={send} id="+">+</li>
          <li onClick={send} id="back">BACK</li>
        </ul>
        <ul className="row row-1">
          <li onClick={send} id="tab">TAB</li>
          <li onClick={send} id="Q">Q</li>
          <li onClick={send} id="W">W</li>
          <li onClick={send} id="E">E</li>
          <li onClick={send} id="R">R</li>
          <li onClick={send} id="T">T</li>
          <li onClick={send} id="Y">Y</li>
          <li onClick={send} id="U">U</li>
          <li onClick={send} id="I">I</li>
          <li onClick={send} id="O">O</li>
          <li onClick={send} id="P">P</li>
          <li onClick={send} id="[">[</li>
          <li onClick={send} id="]">]</li>
          <li onClick={send} id="\">\</li>
        </ul>
        <ul className="row row-2">
          <li onClick={send} id="caps" className={capsActive ? "active" : ""}>
            CAPS</li>
          <li onClick={send} id="A">A</li>
          <li onClick={send} id="S">S</li>
          <li onClick={send} id="D">D</li>
          <li onClick={send} id="F">F</li>
          <li onClick={send} id="G">G</li>
          <li onClick={send} id="H">H</li>
          <li onClick={send} id="J">J</li>
          <li onClick={send} id="K">K</li>
          <li onClick={send} id="L">L</li>
          <li onClick={send} id=":">:</li>
          <li onClick={send} id="''">''</li>
          <li onClick={send} id="enter">ENTER</li>
        </ul>
        <ul className="row row-3">
          <li onClick={send} id="shift" className={shiftActive ? "active" : ""}>SHIFT</li>
          <li onClick={send} id="Z">Z</li>
          <li onClick={send} id="X">X</li>
          <li onClick={send} id="C">C</li>
          <li onClick={send} id="V">V</li>
          <li onClick={send} id="B">B</li>
          <li onClick={send} id="N">N</li>
          <li onClick={send} id="M">M</li>
          <li onClick={send} id=",">,</li>
          <li onClick={send} id=".">.</li>
          <li onClick={send} id=";">;</li>
          <li onClick={send} id="shift" className={shiftActive ? "active" : ""}>SHIFT</li>
        </ul>

        <ul className="row row-4">
          <li onClick={send} id="@">@</li>
          <li onClick={send} id="space"></li>
          <li onClick={send} id="combr">.COM.BR</li>
          <li onClick={send} id="com">.COM</li>
        </ul>
      </div>
    </>
  );
});

export default FloatKeyboard;
