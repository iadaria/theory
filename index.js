
async function client() {
  let obj = {};

  obj[Symbol.toPrimitive] = function(hint) {
    console.log('hint', hint);
  }

  let user = {
    name: "Dasha",
    money: 1000,
    [Symbol.toPrimitive](hint) {
      console.log(`hint ${hint}`)
      return hint == "number" ? this.money : ''
    }
  }

  console.log(+user)  
  console.log(user + 1)
  
}

client()