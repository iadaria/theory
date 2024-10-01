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