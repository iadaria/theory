'use strict';

function client() {
  setTimeout(() => alert("timeout"));

  Promise.resolve()
    .then(() => alert("promise"));
  
  alert("code");
}

client()