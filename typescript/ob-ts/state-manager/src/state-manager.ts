import { useEffect, useState } from "react";

class Subscribable<MessageType> {
  private subscribers: Set<(msg: MessageType) => void> = new Set();

  subscribe(cb: (msg: MessageType) => void): () => void {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  publish(msg: MessageType) {
    this.subscribers.forEach((cb) => cb(msg));
  }
}

export function createStateHook<T>(
  initValue: T
): () => [T, (value: T) => void] {
  const sub = new Subscribable<T>();

  return () => {
    const [value, setValue] = useState<T>(initValue);

    useEffect(() => sub.subscribe(setValue), []);

    console.log("sub", sub);

    return [
      value,
      (newValue: T) => {
        setValue(newValue);
        sub.publish(newValue);
      },
    ];
  };
}
