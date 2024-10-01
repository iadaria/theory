
async function client() {
  const id = Symbol("id");
  const id2 = Symbol("id");
  let obj = {
    [id]: "unique id",
    name: "daria"
  }

  let info = Object.getOwnPropertyDescriptor(obj, "name")

  console.log(info)
  
}

client()