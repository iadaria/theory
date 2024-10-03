# Встроенные прототипы

### Object.prototype

`obj = {...}` – это то же самое, что и `obj = new Object()`, где `Object` – встроенная функция-конструктор для объектов с собственным свойством `prototype`, которое ссылается на огромный объект с методом `toString` и другими.
```js
let obj = {};
obj; // "[object Object]" ?

alert(obj.__proto__ === Object.prototype); // true
// obj.toString === obj.__proto__.toString === Object.prototype.toString

alert(Object.prototype.__proto__); // null
```
[Таким образом, когда вызывается obj.toString(), метод берётся из `Object.prototype`.]\
По цепочке прототипов выше `Object.prototype` больше нет свойства `[[Prototype]]`.

При создании массива [1, 2, 3] внутренне используется конструктор массива Array. Поэтому прототипом массива становится `Array.prototype`, предоставляя ему свои методы. Это позволяет эффективно использовать память.\
Согласно спецификации, наверху иерархии встроенных прототипов находится `Object.prototype`. Поэтому иногда говорят, что «всё наследует от объектов».
![](../../../_img/native-prototypes-classes.svg)
```js
let arr = [1, 2, 3];
// наследует ли от Array.prototype?
alert( arr.__proto__ === Array.prototype ); // true
// затем наследует ли от Object.prototype?
alert( arr.__proto__.__proto__ === Object.prototype ); // true
// и null на вершине иерархии
alert( arr.__proto__.__proto__.__proto__ ); // null
```
Некоторые методы в прототипах могут пересекаться, например, у `Array.prototype` есть свой метод `toString`, который выводит элементы массива через запятую.\
Как мы видели ранее, у `Object.prototype` есть свой метод toString, но так как Array.prototype ближе в цепочке прототипов, то берётся именно вариант для массивов.

![](../../../_img/native-prototypes-array-tostring.svg)
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
