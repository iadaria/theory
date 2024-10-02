# Флаги и дескрипторы свойств

Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).
- `writable` – если true, свойство можно изменить, иначе оно только для чтения.
- `enumerable` – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
- `configurable` – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

Когда мы создаём свойство «обычным способом», все они имеют значение true. Но мы можем изменить их в любое время.

Метод `Object.getOwnPropertyDescriptor` позволяет *получить полную* информацию о свойстве.

```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```
*Возвращаемое значение – это объект, так называемый «дескриптор свойства»: он содержит значение свойства и все его флаги.*

```js
let user = {
  name: "John"
};
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* дескриптор свойства:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```
Чтобы изменить флаги, мы можем использовать метод `Object.defineProperty`.
```js
Object.defineProperty(obj, propertyName, descriptor)
```
```js
// в этот раз все флаги имеют значение false. 
let user = {};
Object.defineProperty(user, "name", {
  value: "John"
});
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert(descriptor, null, 2 );
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
```
```js
Object.defineProperty(user, "name", {
  writable: false
});
user.name = "Pete"; // Ошибка: Невозможно изменить доступное только для чтения свойство 'name' в 'use strict', в нестрогом - нет ошибки но операция не перезапишет
```
## Неперечислимое свойство

Встроенный метод `toString` в объектах – неперечислимый, его не видно в цикле `for..in`. Но если мы напишем свой собственный метод toString, цикл `for..in` будет выводить его по умолчанию:
```js
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};
// По умолчанию оба свойства выведутся:
for (let key in user) alert(key); // name, toString
```
Если мы этого не хотим, можно установить для свойства `enumerable:false`. Тогда оно перестанет появляться в цикле for..in аналогично встроенному `toString`.

Неперечислимые свойства также не возвращаются Object.keys:
```js
alert(Object.keys(user)); // name
```
## Неконфигурируемое свойство
Неконфигурируемое свойство не может быть удалено, его атрибуты не могут быть изменены.\
Определение свойства как неконфигурируемого – это дорога в один конец. Мы не можем изменить его обратно с помощью defineProperty.
*Обратите внимание: configurable: false не даст изменить флаги свойства, а также не даст его удалить. При этом можно изменить значение свойства.*
```js
// Ошибка, из-за configurable: false
Object.defineProperty(Math, "PI", { writable: true });
// Мы абсолютно ничего не можем сделать с Math.PI.
delete Math.PI // Error
```
```js
let user = {
  name: "John"
};
Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});
// теперь невозможно изменить user.name или его флаги
// всё это не будет работать:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```
! Ошибки отображаются только в строгом режиме

### Метод Object.defineProperties

Существует метод `Object.defineProperties(obj, descriptors)`, который позволяет определять множество свойств сразу.
```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```
```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```
### Object.getOwnPropertyDescriptors
Чтобы получить все дескрипторы свойств сразу, можно воспользоваться методом `Object.getOwnPropertyDescriptors(obj)`.

Вместе с `Object.defineProperties `этот метод можно использовать для клонирования объекта вместе с его флагами:
```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```
Обычно при клонировании объекта мы используем присваивание, чтобы скопировать его свойства.\
…Но это не копирует флаги. Так что если нам нужен клон «получше», предпочтительнее использовать `Object.defineProperties`.
```js
for (let key in user) {
  clone[key] = user[key]
}
```
Другое отличие в том, что `for..in` игнорирует символьные и неперечислимые свойства, а Object.getOwnPropertyDescriptors возвращает дескрипторы всех свойств.

## Глобальное запечатывание объекта

Методы, которые ограничивают доступ ко всему объекту:
- Object.preventExtensions(obj)` Запрещает добавлять новые свойства в объект.
- `Object.seal(obj)` Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих свойств.
- `Object.freeze(obj)` Запрещает добавлять/удалять/изменять свойства. Устанавливает configurable: false, writable: false для всех существующих свойств.

А также есть методы для их проверки:
- `Object.isExtensible(obj)`
- `Object.isSealed(obj)`
- `Object.isFrozen(obj)` Возвращает true, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено `configurable: false, writable: false`. 

# Свойства - геттеры и сеттеры

Есть два типа свойств объекта.
- Первый тип это `свойства-данные (data properties)`. Все свойства, которые мы использовали до текущего момента, были свойствами-данными.
- Второй тип - `свойства-аксессоры (accessor properties)`. По своей сути это функции, которые используются для присвоения и получения значения, но во внешнем коде они выглядят как обычные свойства объекта.\
Геттер срабатывает, когда obj.propName читается, сеттер – когда значение присваивается.
```js
let obj = {
  get propName() {
    // геттер, срабатывает при чтении obj.propName
  },
  set propName(value) {
    // сеттер, срабатывает при записи obj.propName = value
  }
};
```
```js
let user = {
  name: "John",
  surname: "Smith",
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};
// set fullName запустится с данным значением
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```
## Дескрипторы свойств доступа
Дескрипторы свойств-аксессоров отличаются от «обычных» свойств-данных.
Свойства-аксессоры не имеют `value` и `writable`, но взамен предлагают функции `get и set`.
То есть, дескриптор аксессора может иметь:
- `get` – функция без аргументов, которая сработает при чтении свойства,
- `set` – функция, принимающая один аргумент, вызываемая при присвоении свойства,
- `enumerable` – то же самое, что и для свойств-данных,
- `configurable` – то же самое, что и для свойств-данных.

```js
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },
  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});
alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```
! Cвойство объекта может быть либо свойством-аксессором (с методами get/set), либо свойством-данным (со значением value).

## Умные геттеры/сеттеры

Геттеры/сеттеры можно использовать как обёртки над «реальными» значениями свойств, чтобы получить больше контроля над операциями с ними.
```js
let user = {
  get name() {
    return this._name;
  },
  set name(value) {
    if (value.length < 4) {
      alert("Имя слишком короткое, должно быть более 4 символов");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Имя слишком короткое...
```
Таким образом, само имя хранится в _name, доступ к которому производится через геттер и сеттер. \
Технически, внешний код всё ещё может получить доступ к имени напрямую с помощью `user._name`, но существует широко известное соглашение о том, что свойства, которые начинаются с символа `_`, являются внутренними, и к ним не следует обращаться из-за пределов объекта.

## Использование для совместимости

У аксессоров есть интересная область применения – они позволяют в любой момент взять «обычное» свойство и изменить его поведение, поменяв на геттер и сеттер.
```js
// Old code
function User(name, age) {
  this.name = name;
  this.age = age;
}
let john = new User("John", 25);
alert( john.age ); // 25
// New code after some time
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}
let john = new User("John", new Date(1992, 6, 1));
// Что нам делать со старым кодом, который использует свойство age?
alert( john.age ); // 25
// Decision
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
  // возраст рассчитывается из текущей даты и дня рождения
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // доступен как день рождения
alert( john.age );      // ...так и возраст
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```