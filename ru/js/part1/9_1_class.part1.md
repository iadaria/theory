# Класс: базовый синтаксис

*В объектно-ориентированном программировании класс – это расширяемый шаблон кода для создания объектов, который устанавливает в них начальные значения (свойства) и реализацию поведения (методы)*.

С этим может помочь кроме `new function`, классы.

## Синтаксис «class»

```js
class MyClass {
  // методы класса
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

`new MyClass()` -  для создания нового объекта со всеми перечисленными методами. При этом автоматически вызывается метод `constructor()`, в нём мы можем инициализировать объект.
1. Создаётся новый объект.
2. `constructor` запускается с заданным аргументом и сохраняет его в `this.name`.
```js
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}
// Использование:
let user = new User("Иван");
user.sayHi();
// доказательство: User - это функция
typeof User; // function
```
*В JavaScript класс – это разновидность функции.*

Вот что на самом деле делает конструкция `class User {...}`:
1. Создаёт функцию с именем `User`, которая становится результатом объявления класса. Код функции берётся из метода constructor (она будет пустой, если такого метода нет).
2. Сохраняет все методы, такие как sayHi, в User.prototype.

При вызове метода объекта new User он будет взят из прототипа.\
На картинке показан результат объявления `class User`:

![](../../../_img/class-user.svg)

```js
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}
// класс - это функция
typeof User; // function
// ...или, если точнее, это метод constructor
User === User.prototype.constructor; // true
// Методы находятся в User.prototype, например:
User.prototype.sayHi; // sayHi() { alert(this.name); }
// в прототипе ровно 2 метода
Object.getOwnPropertyNames(User.prototype); // constructor, sayHi
```
## Не просто синтаксический сахар

[Иногда говорят, что class – это просто «синтаксический сахар» в JavaScript (синтаксис для улучшения читаемости кода, но не делающий ничего принципиально нового), потому что мы можем сделать всё то же самое без конструкции `class`]\
Перепишем класс:
```js
// перепишем класс User на чистых функциях
// 1. Создаём функцию constructor
function User(name) {
  this.name = name;
}
// каждый прототип функции имеет свойство constructor по умолчанию,
// поэтому нам нет необходимости его создавать
// 2. Добавляем метод в прототип
User.prototype.sayHi = function() {
  alert(this.name);
};
// Использование:
let user = new User("Иван");
user.sayHi();
```
Однако есть важные отличия:
1. Во-первых, функция, созданная с помощью `class`, помечена специальным внутренним свойством `[[IsClassConstructor]]: true`. Поэтому это не совсем то же самое, что создавать её вручную.
В отличие от обычных функций, конструктор класса не может быть вызван без `new`:
```js
class User {
  constructor() {}
}
typeof User; // function
User(); // Error: Class constructor User cannot be invoked without 'new'
```
[Кроме того, строковое представление конструктора класса в большинстве движков JavaScript начинается с «class …»]\
```js
class User {
  constructor() {}
}
alert(User); // class User { ... }
```
2. Методы класса являются неперечислимыми. Определение класса устанавливает флаг enumerable в false для всех методов в "prototype".\
И это хорошо, так как если мы проходимся циклом for..in по объекту, то обычно мы не хотим при этом получать методы класса.
3. Классы всегда используют `use strict`. Весь код внутри класса автоматически находится в строгом режиме.

## Class Expression

Как и функции, классы можно определять внутри другого выражения, передавать, возвращать, присваивать и т.д.\
Если у `Class Expression` есть имя, то оно видно только внутри класса:
```js
// Class Expression (по аналогии с Function Expression):
let User = class {
  sayHi() {
    alert("Привет");
  }
};
// "Named Class Expression"
// (в спецификации нет такого термина, но происходящее похоже на Named Function Expression)
let User = class MyClass {
  sayHi() {
    alert(MyClass); // имя MyClass видно только внутри класса
  }
};

new User().sayHi(); // работает, выводит определение MyClass

alert(MyClass); // ошибка, имя MyClass не видно за пределами класса
```
Мы даже можем динамически создавать классы «по запросу»:
```js
function makeClass(phrase) {
  // объявляем класс и возвращаем его
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}
// Создаём новый класс
let User = makeClass("Привет");

new User().sayHi(); // Привет
```
## Геттеры/сеттеры, другие сокращения

Как и в литеральных объектах, в классах можно объявлять вычисляемые свойства, геттеры/сеттеры и т.д.
```js
class User {
  // Свойства, новая возможность
  age = 34;
  constructor(name) {
    // вызывает сеттер
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      alert("Имя слишком короткое.");
      return;
    }
    this._name = value;
  }
  ['say' + 'Hi2']() {
    alert("Привет");
  }
}

let user = new User("Иван");
alert(user.name); // Иван

user = new User(""); // Имя слишком короткое.
user.sayHi2();
```
При объявлении класса геттеры/сеттеры создаются на `User.prototype`, вот так:
```js
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```
# Наследование классов

Наследование классов – это способ расширения одного класса другим классом.

## Ключевое слово «extends»
```js
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} прячется!`);
  }
}
let rabbit = new Rabbit("Белый кролик");
rabbit.run(5); // Белый кролик бежит со скоростью 5.
rabbit.hide(); // Белый кролик прячется!
```
Внутри ключевое слово extends работает по старой доброй механике прототипов. Оно устанавливает `Rabbit.prototype.[[Prototype]]` в `Animal.prototype`. Таким образом, если метода не оказалось в `Rabbit.prototype`, JavaScript берет его из `Animal.prototype`.

![](../../../_img/animal-rabbit-extends.svg)

Например, чтобы найти метод rabbit.run, движок проверяет (снизу вверх на картинке):
1. Объект `rabbit` (не имеет run).
2. Его прототип, то есть `Rabbit.prototype` (имеет `hide`, но не имеет `run`).
3. Его прототип, то есть (вследствие `extends`) `Animal.prototype`, в котором, наконец, есть метод `run`.
4 При обращении к `super` стрелочной функции он берётся из внешней функции.
Синтаксис создания класса допускает указывать после extends не только класс, но и любое выражение.
```js
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}
class User extends f("Привет") {}
new User().sayHi(); // Привет
```

## Переопределение методов
- `super.method(...)` вызывает родительский метод.
- `super(...)` для вызова родительского конструктора (работает только внутри нашего конструктора).
```js
class Rabbit extends Animal {
  stop() {
    // ...теперь это будет использоваться для rabbit.stop()
    // вместо stop() из класса Animal
  }
}
```
## Переопределение конструктора

Согласно спецификации, если класс расширяет другой класс и не имеет конструктора, то автоматически создаётся такой «пустой» конструктор:\
[Как мы видим, он просто вызывает конструктор родительского класса. Так будет происходить, пока мы не создадим собственный конструктор.]
```js
class Rabbit extends Animal {
  // генерируется для классов-потомков, у которых нет своего конструктора
  constructor(...args) {
    super(...args);
  }
}
```
! *Конструкторы в наследуемых классах должны обязательно вызывать super(...), и (!) делать это перед использованием this.*

... Нужно дополнить
```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}
class Rabbit extends Animal {
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
  // ...
}
// Не работает!
let rabbit = new Rabbit("Белый кролик", 10); // Error: this is not defined.
// Должно быть
class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
  // ...
}

```

```js
```

```js
```

```js
```

```js
```