import fs from "fs";
export class HandlerStack<MessageType> {
  private subscribers: Set<(msg: MessageType) => undefined | unknown> =
    new Set();

  constructor() {}

  subscribe(cb: (msg: MessageType) => void): () => void {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  publish(msg: MessageType): undefined | unknown {
    let data: unknown;
    for (const subscriber of Array.from(this.subscribers)) {
      data = subscriber(msg);
      if (data !== undefined) {
        break;
      }
    }
    return data;
  }
}

const handlers = new HandlerStack<{
  name: string;
  context: string;
}>();

handlers.subscribe(({ name, context }) => {
  if (name.endsWith(".json")) {
    return JSON.parse(context);
  }
});
handlers.subscribe(({ context }) => `${context}`);

for (const file of fs.readdirSync("./files")) {
  const context = fs.readFileSync(`./files/${file}`, "utf8");
  const data = handlers.publish({ name: file, context });
  console.log("data", data);
}
