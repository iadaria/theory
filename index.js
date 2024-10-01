
async function client() {
  const id = Symbol("id");
  const id2 = Symbol("id");
  let obj = {
    [id]: "unique id",
    [id2]: "unique id",
    name: "daria"
  }

  const globalId = Symbol.for("id");
  const nameId = Symbol.keyFor(globalId);

  let symbolProperties = Object.getOwnPropertySymbols(obj);
  console.log(symbolProperties);

  let allKeys = Reflect.ownKeys(obj);
  console.log(allKeys)
}

client()