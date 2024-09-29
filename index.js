'use strict';

function client() {
  let promise = Promise.resolve();

  promise.then(() => console.log("promise is resloved"))

  console.log('Code finished')
}

client()