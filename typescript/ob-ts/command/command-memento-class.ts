abstract class CommandMemento<State> {
  abstract execute(state: State): State;
}

class CommandMementoStack<State> {
  private stack: string[] = [];

  constructor(private _state: State) {
    this.stack.push(JSON.stringify(_state));
  }

  get state() {
    return JSON.parse(this.stack[this.stack.length - 1]);
  }

  excute(command: CommandMemento<State>) {
    const strState = JSON.stringify(command.execute(this.state));
    this.stack.push(strState);
  }

  undo() {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }
}

class AddOne extends CommandMemento<number> {
  execute(state: number): number {
    return state + 1;
  }
  undo(state: number): number {
    return state - 1;
  }
}
const cs1 = new CommandMementoStack(0);
console.log(cs1.state);
cs1.excute(new AddOne());
console.log(cs1.state);
cs1.undo();
console.log(cs1.state);
