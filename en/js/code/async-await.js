async function f() {
  return 1;
}

/** Error handling */

async function f() {
  await Promise.reject(new Error("Whoops"));
}

async function f() {
  throw new Error("WHoops!");
}

async function f() {
  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    alert(err);
  }
}

async function f() {
  let response = await fetch('http://no-such-url');
}

f().catch(alert);


let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  // ...
]);