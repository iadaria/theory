# Proxy и Reflect

Объект Proxy «оборачивается» вокруг другого объекта и может перехватывать (и, при желании, самостоятельно обрабатывать) разные действия с ним, например чтение/запись свойств и другие. Далее мы будем называть такие объекты «прокси».

Прокси используются во многих библиотеках и некоторых браузерных фреймворках. В этой главе мы увидим много случаев применения прокси в решении реальных задач.
```js
let proxy = new Proxy(target, handler);
```
- `target` – это объект, для которого нужно сделать прокси, может быть чем угодно, включая функции.
- `handler` – конфигурация прокси: объект с «ловушками» («traps»): методами, которые перехватывают разные операции, например, ловушка `get` – для чтения свойства из `target`, ловушка `set` – для записи свойства в `target` и так далее.

При операциях над proxy, если в handler имеется соответствующая «ловушка», то она срабатывает, и прокси имеет возможность по-своему обработать её, иначе операция будет совершена над оригинальным объектом target.

В качестве начального примера создадим прокси без всяких ловушек:
```js
let target = {};
let proxy = new Proxy(target, {}); // пустой handler

proxy.test = 5; // записываем в прокси (1)
alert(target.test); // 5, свойство появилось в target!
alert(proxy.test); // 5, мы также можем прочитать его из прокси (2)

for(let key in proxy) alert(key); // test, итерация работает (3)
```
Так как нет ловушек, то все операции на proxy применяются к оригинальному объекту `target`.
1. Запись свойства `proxy.test=` устанавливает значение на target.
2. Чтение свойства `proxy.test` возвращает значение из target.
3. Итерация по `proxy` возвращает значения из `target`.

Proxy – это особый, «экзотический», объект, у него нет собственных свойств. С пустым `handler` он просто перенаправляет все операции на `target`.
- Чтобы активировать другие его возможности, добавим ловушки.

[Для большинства действий с объектами в спецификации JavaScript есть так называемый «внутренний метод», который на самом низком уровне описывает, как его выполнять. Например, `[[Get]]` – внутренний метод для чтения свойства, `[[Set]]` – для записи свойства, и так далее. Эти методы используются только в спецификации, мы не можем обратиться напрямую к ним по имени.]

Ловушки как раз перехватывают вызовы этих внутренних методов. Полный список методов, которые можно перехватывать, перечислен в спецификации Proxy, а также в таблице ниже.

Для каждого внутреннего метода в этой таблице указана ловушка, то есть имя метода, который мы можем добавить в параметр handler при создании new Proxy, чтобы перехватывать данную операцию.


Внутренний метод /	Ловушка /	Что вызывает
[[Get]]	get	чтение свойства
[[Set]]	set	запись свойства
[[HasProperty]]	has	оператор in
[[Delete]]	deleteProperty	оператор delete
[[Call]]	apply	вызов функции
[[Construct]]	construct	оператор new
[[GetPrototypeOf]]	getPrototypeOf	Object.getPrototypeOf
[[SetPrototypeOf]]	setPrototypeOf	Object.setPrototypeOf
[[IsExtensible]]	isExtensible	Object.isExtensible
[[PreventExtensions]]	preventExtensions	Object.preventExtensions
[[DefineOwnProperty]]	defineProperty	Object.defineProperty, Object.defineProperties
[[GetOwnProperty]]	getOwnPropertyDescriptor	Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
[[OwnPropertyKeys]]	ownKeys	Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object.keys/values/entries


## Значение по умолчанию с ловушкой «get»

Чаще всего используются ловушки на чтение/запись свойств.
```js
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // значение по умолчанию
    }
  }
});

alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (нет такого элемента)

let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary['Hello']; // Hola
dictionary['Welcome']; // undefined

dictionary = new Proxy(dictionary, {
  get(target, phrase) { // перехватываем чтение свойства в dictionary
    if (phrase in target) { // если перевод для фразы есть в словаре
      return target[phrase]; // возвращаем его
    } else {
      // иначе возвращаем непереведённую фразу
      return phrase;
    }
  }
});
// Запросим перевод произвольного выражения в словаре!
// В худшем случае оно не будет переведено
dictionary['Hello']; // Hola
dictionary['Welcome to Proxy']; // Welcome to Proxy (
```
- ! Прокси следует использовать везде вместо target \
Пожалуйста, обратите внимание: прокси перезаписывает переменную:
`dictionary = new Proxy(dictionary, ...);`
Прокси должен заменить собой оригинальный объект повсюду. Никто не должен ссылаться на оригинальный объект после того, как он был проксирован. Иначе очень легко запутаться.

## Валидация с ловушкой «set»

```js
let numbers = [];

numbers = new Proxy(numbers, { // (*)
  set(target, prop, val) { // для перехвата записи свойства
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // добавилось успешно
numbers.push(2); // добавилось успешно
alert("Длина: " + numbers.length); // 2

numbers.push("тест"); 
```
## Перебор при помощи «ownKeys» и «getOwnPropertyDescriptor»

```js
let user = {
  name: "Вася",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// ownKeys исключил _password
for(let key in user) alert(key); // name, затем: age

// аналогичный эффект для этих методов:
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // Вася,30
```

```js
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // вызывается 1 раз для получения списка свойств
    return ['a', 'b', 'c'];
  },
  getOwnPropertyDescriptor(target, prop) { // вызывается для каждого свойства
    return {
      enumerable: true,
      configurable: true
      /* ...другие флаги, возможно, "value: ..." */
    };
  }
});
Object.keys(user); // a, b, c
```

## Защищённые свойства с ловушкой «deleteProperty» и другими

```js
let user = {
  name: "Вася",
  _password: "secret"
};
alert(user._password); // secret
```
Нам будут нужны следующие ловушки:
- `get` – для того, чтобы сгенерировать ошибку при чтении такого свойства,
- `set` – для того, чтобы сгенерировать ошибку при записи,
- `deleteProperty` – для того, чтобы сгенерировать ошибку при удалении,
- `ownKeys` – для того, чтобы исключить такие свойства из `for..in` и методов типа `Object.keys`.

```js
let user = {
  name: "Вася",
  _password: "***"
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе");
    } else {
      let value = target[prop];
      return (typeof value === 'function') ? value.bind(target) : value; // (*)
    }
  },
  set(target, prop, val) { // перехватываем запись свойства
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) { // перехватываем удаление свойства
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) { // перехватываем попытку итерации
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" не позволяет прочитать _password
try {
  alert(user._password); // Error: Отказано в доступе
} catch(e) { alert(e.message); }

// "set" не позволяет записать _password
try {
  user._password = "test"; // Error: Отказано в доступе
} catch(e) { alert(e.message); }

// "deleteProperty" не позволяет удалить _password
try {
  delete user._password; // Error: Отказано в доступе
} catch(e) { alert(e.message); }

// "ownKeys" исключает _password из списка видимых для итерации свойств
for(let key in user) alert(key); // name
```

## «В диапазоне» с ловушкой «has»
```js
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end
  }
});

alert(5 in range); // true
alert(50 in range); // false
```
## Оборачиваем функции: «apply»

```js
function delay(f, ms) {
  // возвращает обёртку, которая вызывает функцию f через таймаут
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Привет, ${user}!`);
}

// после обёртки вызовы sayHi будут срабатывать с задержкой в 3 секунды
sayHi = delay(sayHi, 3000);

sayHi("Вася"); // Привет, Вася! (через 3 секунды)
```
```js
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Привет, ${user}!`);
}

sayHi = delay(sayHi, 3000);

alert(sayHi.length); // 1 (*) прокси перенаправляет чтение свойства length на исходную функцию

sayHi("Вася"); // Привет, Вася! (через 3 секунды)
```

## Reflect

`Reflect` – встроенный объект, упрощающий создание прокси. Ранее мы говорили о том, что внутренние методы, такие как `[[Get]]`, `[[Set]]` и другие, существуют только в спецификации, что к ним нельзя обратиться напрямую.\
Объект `Reflect` делает это возможным. Его методы – минимальные обёртки вокруг внутренних методов.


Операция	Вызов Reflect	Внутренний метод \
obj[prop] -	Reflect.get(obj, prop) -	[[Get]] \
obj[prop] = value -	Reflect.set(obj, prop, value) -	[[Set]] \
delete obj[prop] - Reflect.deleteProperty(obj, prop) -	[[Delete]] \
new F(value) -	Reflect.construct(F, value) -	[[Construct]] 

```js
let user = {};
Reflect.set(user, 'name', 'Вася');
alert(user.name); // Вася
```

```js
let user = {
  name: "Вася",
};
user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});
let name = user.name; // выводит "GET name"
user.name = "Петя"; // выводит "SET name=Петя"
```

```js
```

```js
```

```js
```

```js
```


