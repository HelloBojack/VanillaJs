import React, { useState } from "react";
import { useStateWithUndo } from "./state-with-undo";

function Counter() {
  const [value, todo, undo] = useStateWithUndo(0);

  return (
    <>
      <div>{value}</div>
      <button onClick={() => todo(value + 1)}>add</button>
      <button onClick={() => todo(value - 1)}>-</button>
      <button onClick={() => undo()}>undo</button>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Counter></Counter>
    </div>
  );
}

export default App;
