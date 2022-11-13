abstract class Command<State> {
  abstract execute(state: State): State;
  abstract undo(state: State): State;
}

class CommandStack<State> {
  private stack: Command<State>[] = [];

  constructor(private _state: State) {}

  get state() {
    return this._state;
  }

  excute(command: Command<State>) {
    this._state = command.execute(this._state);
    this.stack.push(command);
  }

  undo() {
    const command = this.stack.pop();
    if (command) {
      this._state = command.undo(this._state);
    }
  }
}

// class AddOne extends Command<number> {
//   execute(state: number): number {
//     return state + 1;
//   }
//   undo(state: number): number {
//     return state - 1;
//   }
// }
// const cs = new CommandStack(0);
// console.log(cs.state);
// cs.excute(new AddOne());
// console.log(cs.state);
// cs.undo();
// console.log(cs.state);

class SetValue extends Command<number> {
  private _originalNumber?: number;
  constructor(private value: number) {
    super();
  }

  execute(state: number): number {
    this._originalNumber = state;
    return this.value;
  }

  undo(state: number): number {
    return this._originalNumber!;
  }
}

const cs = new CommandStack(0);
cs.excute(new SetValue(20));
console.log(cs.state);
cs.undo();
console.log(cs.state);
