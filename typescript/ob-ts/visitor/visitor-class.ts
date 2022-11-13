class Visitor<DataType> {
  constructor(private baseUrl: string) {}

  async visit(visitor: (results: DataType[]) => void) {
    let nextUrl = this.baseUrl;

    do {
      const res = await fetch(nextUrl);
      const json = await res.json();
      visitor(json.results);
      nextUrl = json.next;
    } while (nextUrl);
  }
}

const v = new Visitor("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1");
v.visit((results) => {
  console.log("results", results);
});
