import React, { useState } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

export default (props) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  function clearMemory() {
    setDisplayValue(0);
    setClearDisplay(false);
    setOperation(null);
    setValues([0, 0]);
    setCurrent(0);
  }

  function OnOperation(operations) {
    if (current === 0) {
      setOperation(operations);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = operations === "=";
      const currentOperation = operation;

      const value = [...values];
      try {
        value[0] = eval(`${value[0]} ${currentOperation} ${value[1]}`);
      } catch (e) {
        value[0] = values[0];
      }
      value[1] = 0;

      setDisplayValue(value[0]);
      setOperation(equals ? null : operations);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(value);
    }
  }

  function addDigit(digit) {
    if (digit === "." && displayValue.includes(".")) {
      return;
    }

    const clear = displayValue === 0 || clearDisplay;

    const currentValue = clear ? "" : displayValue;

    const value = currentValue + digit;

    setDisplayValue(value);
    setClearDisplay(false);

    if (digit !== ".") {
      const i = current;
      const newValue = parseFloat(value);
      const valores = [...values];
      valores[i] = newValue;
      setValues(valores);
    }
  }

  return (
    <div className="calculator">
      <Display display={displayValue}></Display>
      <Button label="AC" click={clearMemory} triple></Button>
      <Button label="/" click={OnOperation} operation></Button>
      <Button label="7" click={addDigit}></Button>
      <Button label="8" click={addDigit}></Button>
      <Button label="9" click={addDigit}></Button>
      <Button label="*" click={OnOperation} operation></Button>
      <Button label="4" click={addDigit}></Button>
      <Button label="5" click={addDigit}></Button>
      <Button label="6" click={addDigit}></Button>
      <Button label="-" click={OnOperation} operation></Button>
      <Button label="1" click={addDigit}></Button>
      <Button label="2" click={addDigit}></Button>
      <Button label="3" click={addDigit}></Button>
      <Button label="+" click={OnOperation} operation></Button>
      <Button label="0" click={addDigit} double></Button>
      <Button label="." click={addDigit}></Button>
      <Button label="=" click={OnOperation} operation></Button>
    </div>
  );
};
