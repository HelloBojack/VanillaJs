import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from "react";
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

type useTodosManagerReturn = ReturnType<typeof useTodosManager>;
const TodosContext = createContext<useTodosManagerReturn>({
  todos: [],
  addTodo: () => {},
  delTodo: () => {},
});

const useTodosManager = (
  initTodos: Todo[]
): {
  todos: Todo[];
  addTodo: (data: string) => void;
  delTodo: (data: string) => void;
} => {
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
  const [todos, dispatch] = useReducer(reducer, initTodos);
  const addTodo = useCallback(
    (value: string) => dispatch({ type: "ADD", name: value }),
    []
  );
  const delTodo = useCallback(
    (id: string) => dispatch({ type: "DEL", id }),
    []
  );
  return { todos, addTodo, delTodo };
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

const TodosProvider: React.FC<{
  initTodos: Todo[];
  children: React.ReactNode;
}> = ({ initTodos, children }) => {
  return (
    <TodosContext.Provider value={useTodosManager(initTodos)}>
      {children}
    </TodosContext.Provider>
  );
};

function App() {
  const { todos, addTodo, delTodo } = useContext(TodosContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={() => addTodo(inputRef.current?.value ?? "")}>
          Add
        </button>
        <UL
          items={todos}
          render={(item) => (
            <>
              {item.name}
              <button onClick={() => delTodo(item.id)}>delete</button>
            </>
          )}
        ></UL>
      </div>
    </>
  );
}

function AppWapper() {
  return (
    <TodosProvider initTodos={list}>
      <App />
      <App />
    </TodosProvider>
  );
}

export default AppWapper;
