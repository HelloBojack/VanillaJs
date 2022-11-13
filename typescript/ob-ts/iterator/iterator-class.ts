async function* iterateResults(baseUrl: string) {
  let nextUrl = baseUrl;

  do {
    const res = await fetch(nextUrl);
    const json = await res.json();
    yield json.results;
    nextUrl = json.next;
  } while (nextUrl);
}

async function getPokemon() {
  for await (const results of iterateResults(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1"
  )) {
    console.log("results", results);
  }
}

getPokemon();
