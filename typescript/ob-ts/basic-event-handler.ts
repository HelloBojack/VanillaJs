type FilterFn<T> = (data: T[keyof T]) => boolean;
type Filters<T> = Record<keyof T, FilterFn<T>[]>;
type MapFn<T> = (data: T[keyof T]) => T[keyof T];
type Maps<T> = Record<keyof T, MapFn<T>[]>;

type ProcessedEvents<T> = { eventName: keyof T; data: T[keyof T] }[];

class EventProcessor<T> {
  private filters: Filters<T> = <Filters<T>>{};
  private maps: Maps<T> = <Maps<T>>{};
  private processedEvents: ProcessedEvents<T> = [];

  handleEvent(eventName: keyof T, data: T[keyof T]): void {
    let allowEvent = true;

    this.filters[eventName]?.forEach((filter) => {
      if (!filter(data)) {
        allowEvent = false;
      }
    });

    if (allowEvent) {
      let mapdata = { ...data };
      this.maps[eventName]?.forEach((map) => {
        mapdata = map(data);
      });
      this.processedEvents.push({
        eventName,
        data: mapdata,
      });
    }
  }

  addFilter(eventName: keyof T, filter: (data: T[keyof T]) => boolean): void {
    this.filters[eventName] ||= [];
    this.filters[eventName].push(filter);
  }

  addMap(eventName: keyof T, map: (data: T[keyof T]) => T[keyof T]): void {
    this.maps[eventName] ||= [];
    this.maps[eventName].push(map);
  }

  getProcessedEvents() {
    return this.processedEvents;
  }
}

interface EventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<EventMap> {}

const uep = new UserEventProcessor();

uep.addFilter("login", ({ user }) => Boolean(user));

uep.addMap("login", (data) => ({
  ...data,
  hasSession: Boolean(data.user),
}));

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
