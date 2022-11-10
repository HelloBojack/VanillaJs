import React, { useCallback, useReducer, useRef } from "react";
type Todo = {
  id: string;
  name: string;
};
type ActionType =
  | {
      type: "ADD";
      name: string;
    }
  | { type: "DEL"; id: string };

const list: Todo[] = [
  {
    id: "1",
    name: "react",
  },
  {
    id: "2",
    name: "vue",
  },
];

const useTodo = (
  initState: Todo[]
): [Todo[], (data: string) => void, (data: string) => void] => {
  const reducer = (state: Todo[], action: ActionType): Todo[] => {
    switch (action.type) {
      case "ADD":
        return [...state, { name: action.name, id: String(state.length + 1) }];
      case "DEL":
        return state.filter((item) => item.id != action.id);
      default:
        throw Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const addList = useCallback(
    (value: string) => dispatch({ type: "ADD", name: value }),
    []
  );
  const delList = useCallback(
    (id: string) => dispatch({ type: "DEL", id }),
    []
  );
  return [state, addList, delList];
};

function UL<T>({
  items,
  render,
}: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  const [state, addList, delList] = useTodo(list);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={() => addList(inputRef.current?.value ?? "")}>
          Add
        </button>
        <UL
          items={state}
          render={(item) => (
            <>
              {item.name}
              <button onClick={() => delList(item.id)}>delete</button>
            </>
          )}
        ></UL>
      </div>
    </>
  );
}

export default App;
