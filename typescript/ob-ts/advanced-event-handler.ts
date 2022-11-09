type FilterFn<T> = (data: T[keyof T]) => boolean;
type MapFn<T> = (data: T[keyof T]) => T[keyof T];
type ProcessedEvents<T> = {
  eventName: keyof T;
  data: T[keyof T];
}[];
type Handler<T> = {
  [Prop in keyof T as `map${Capitalize<string & Prop>}`]?: (
    data: T[Prop]
  ) => T[Prop];
} & {
  [Prop in keyof T as `filter${Capitalize<string & Prop>}`]?: (
    data: T[Prop]
  ) => boolean;
};

class EventProcessor<T> {
  private handlers: Handler<T>[] = [];
  private processedEvents: ProcessedEvents<T> = [];

  handleEvent(eventName: keyof T, data: T[keyof T]): void {
    let allowEvent = true;
    let capitalize = (s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

    this.handlers.forEach((handler) => {
      const filterFunc = handler[
        `filter${capitalize(eventName as string)}` as keyof Handler<T>
      ] as (data: T[keyof T]) => boolean;
      if (!filterFunc || !filterFunc(data)) {
        allowEvent = false;
      }
    });

    if (allowEvent) {
      let mapdata = { ...data };
      this.handlers.forEach((handler) => {
        const mapFunc = handler[
          `map${capitalize(eventName as string)}` as keyof Handler<T>
        ] as (data: T[keyof T]) => T[keyof T];
        mapdata = mapFunc(data);
      });

      this.processedEvents.push({
        eventName,
        data: mapdata,
      });
    }
  }

  addHandler(
    handle: Handler<T>
    // : {
    // filterLogin: (data: T[keyof T]) => boolean;
    // mapLogin: (data: T[keyof T]) => T[keyof T];
    // }
  ) {
    this.handlers.push(handle);
  }

  getProcessedEvents(): ProcessedEvents<T> {
    return this.processedEvents;
  }
}

interface EventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<EventMap> {}

const uep = new UserEventProcessor();
uep.addHandler({
  filterLogin: ({ user }) => Boolean(user),
  mapLogin: (data) => {
    console.log("data", data);

    return {
      ...data,
      hasSession: Boolean(data.user),
    };
  },
});

uep.handleEvent("login", {
  user: undefined,
  name: "jack",
});
uep.handleEvent("login", {
  user: "tom",
  name: "tomas",
});
uep.handleEvent("logout", {
  user: "tom",
});

console.log(uep.getProcessedEvents());

/*
Result:

[
  {
    eventName: 'login',
    data: { user: 'tom', name: 'tomas', hasSession: true }
  },
  { eventName: 'logout', data: { user: 'tom' } }
]
*/
