import React, { useState } from "react";
import { createStateHook } from "./state-manager";

const useCnt = createStateHook(0);

function Counter() {
  const [count, setCount] = useState(0);
  const [cnt, setCnt] = useCnt();
  return (
    <>
      <h1>{count}</h1>
      <h1>{cnt}</h1>
      <button onClick={() => setCount(count + 1)}>add</button>
      <button onClick={() => setCnt(cnt + 1)}>add</button>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}

export default App;
