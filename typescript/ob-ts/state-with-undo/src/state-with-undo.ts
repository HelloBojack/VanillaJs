import { useCallback, useRef, useState } from "react";

type CommandMementoFunction<State> = (state: State) => State;

class CommandMementoStack<State> {
  private stack: string[] = [];

  constructor(private _state: State) {
    this.stack.push(JSON.stringify(_state));
  }

  get state() {
    return JSON.parse(this.stack[this.stack.length - 1]);
  }

  execute(command: CommandMementoFunction<State>) {
    const newState = command(this.state);
    this.stack.push(JSON.stringify(newState));
    return newState;
  }

  undo() {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
    return this.state;
  }
}

export function useStateWithUndo<DataType>(
  initData: DataType
): [DataType, (newData: DataType) => void, () => void] {
  const [state, setState] = useState(initData);
  const stack = useRef(new CommandMementoStack(state));

  return [
    state,
    useCallback((value: DataType) => {
      const newState = stack.current.execute(() => value);
      setState(newState);
    }, []),
    useCallback(() => {
      const newState = stack.current.undo();
      setState(newState);
    }, []),
  ];
}
