import { Subscribable } from "./sub-ob-class";

class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super();
  }

  setValue(value: number) {
    this.value = value;
    this.publish(value);
  }
}

const dc = new DataClass(0);
dc.subscribe(console.log);
dc.setValue(55);
