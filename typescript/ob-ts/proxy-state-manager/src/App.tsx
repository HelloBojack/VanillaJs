import React, { useState } from "react";
import { createObservable, useObservable } from "./state-manager";

const globalState = createObservable({
  count: 0,
});

function Counter() {
  const [count, setCount] = useState(0);
  const cnt = useObservable(globalState);
  return (
    <>
      <h1>{count}</h1>
      <h1>{cnt.count}</h1>
      <button onClick={() => setCount(count + 1)}>add</button>
      <button onClick={() => (cnt.count += 1)}>add</button>
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
