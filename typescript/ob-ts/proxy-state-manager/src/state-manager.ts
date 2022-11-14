import { useEffect, useState } from "react";

function createSubscribable<MessageData>() {
  const subscribers: Set<(msg: MessageData) => void> = new Set();

  return {
    subscribe(cb: (msg: MessageData) => void): () => void {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },

    publish(msg: MessageData) {
      subscribers.forEach((cb) => cb(msg));
    },
  };
}

type ObservableMessage<T> = {
  target: T;
  prop: string;
};
type Observable<T> = T & {
  subscribe: (cb: (data: ObservableMessage<T>) => void) => void;
};

export function createObservable<DataType>(
  data: DataType
): Observable<DataType> {
  const subscribe = createSubscribable<ObservableMessage<DataType>>();

  return new Proxy(
    {
      ...data,
      subscribe: subscribe.subscribe,
    },
    {
      set: function (target: object, prop: string, value: any) {
        Reflect.set(target, prop, value);
        subscribe.publish({
          target,
          prop,
        } as unknown as ObservableMessage<DataType>);
        return true;
      },
    }
  ) as Observable<DataType>;
}

export function useObservable<DataType>(data: Observable<DataType>): DataType {
  const [, setVersion] = useState(0);

  useEffect(() => data.subscribe(() => setVersion((v) => v + 1)), [data]);

  return data;
}
