# Перебираемые объекты

Перебираемые (или итерируемые) объекты – это обобщение массивов. Концепция, которая позволяет использовать любой объект в цикле for..of.

Если объект не является массивом, но представляет собой коллекцию каких-то элементов (список, набор), то удобно использовать цикл for..of для их перебора, так что давайте посмотрим, как это сделать.
  
Чтобы сделать объект итерируемым (и позволить for..of работать с ним), нам нужно добавить в объект метод с именем `Symbol.iterator`:
1) Когда цикл `for..of` запускается, он вызывает этот метод один раз (или выдаёт ошибку, если метод не найден). Этот метод должен вернуть итератор – объект с методом `next`.
2) Дальше `for..of` работает только с этим возвращённым объектом.
3) Когда `for..of` хочет получить следующее значение, он вызывает метод `next()` этого объекта.
4) Результат вызова `next()` должен иметь вид `{done: Boolean, value: any}`, где `done=tru`e означает, что цикл завершён, в противном случае `value`содержит очередное значение.
```js
let rang = {
  from: 1,
  to: 3,
  [Symbol.iterator]: function() {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++}
        } else {
          return { done: true }
        }
      }
    }
  }
}
// теперь работает!
for (let num of range) {
  alert(num); // 1, затем 2, 3, 4, 5
}
```
Или
```js
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, затем 2, 3, 4, 5
}

// явный вызов итератора
let str = "Hello";
// делает то же самое, что и
// for (let char of str) alert(char);
let iterator = str[Symbol.iterator]();
while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // выводит символы один за другим
}
```
Недостаток такого подхода в том, что теперь мы не можем использовать этот объект в двух параллельных циклах for..of: у них будет общее текущее состояние итерации, потому что теперь существует лишь один итератор – сам объект.

Можно сделать бесконечный итератор `to = Infinity`. Или мы можем создать итерируемый объект, который генерирует бесконечную последовательность псевдослучайных чисел. Это бывает полезно.

# Итераторы и псевдомассивы

Есть два официальных термина, которые очень похожи, но в то же время сильно различаются. Поэтому убедитесь, что вы как следует поняли их, чтобы избежать путаницы.
- Итерируемые объекты – это объекты, которые реализуют метод Symbol.iterator, как было описано выше.
- Псевдомассивы – это объекты, у которых есть индексы и свойство length, то есть, они выглядят как массивы.
- И итерируемые объекты, и псевдомассивы – это обычно не массивы, у них нет методов push, pop
- Есть универсальный метод `Array.from`, который принимает итерируемый объект или псевдомассив и делает из него «настоящий» Array. После этого мы уже можем использовать методы массивов.
```js
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

let arr = Array.from(arrayLike); // (*)
alert(arr.pop()); // World (метод работает)
```

# Map and Set

Map – это коллекция ключ/значение, как и Object. Но основное отличие в том, что Map позволяет использовать ключи любого типа.

Методы и свойства:
- new Map() – создаёт коллекцию.
- map.set(key, value) – записывает по ключу key значение value.
- map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
- map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
- map.delete(key) – удаляет элемент (пару «ключ/значение») по ключу key.
- map.clear() – очищает коллекцию от всех элементов.
- map.size – возвращает текущее количество элементов.

Как мы видим, в отличие от объектов, ключи не были приведены к строкам. Можно использовать любые типы данных для ключей.\
Хотя map[key] также работает, например, мы можем установить map[key] = 2,  в этом случаеmap рассматривался бы как обычный JavaScript объект, таким образом это ведёт ко всем соответствующим ограничениям (только строки/символьные ключи и так далее).
- Map может использовать объекты в качестве ключей.
- Это почти такое же сравнение, что и ===.
- Так что `NaN` также может использоваться в качестве ключа.
- Каждый вызов `map.set` возвращает объект map, так что мы можем объединить вызовы в цепочку:

Для перебора коллекции Map есть 3 метода:
- map.keys() – возвращает итерируемый объект по ключам,
- map.values() – возвращает итерируемый объект по значениям,
- map.entries() – возвращает итерируемый объект по парам вида [ключ, значение], этот вариант используется по умолчанию в for..of.
- в Map перебор происходит в том же порядке, в каком происходило добавление элементов.
- Кроме этого,`Map` имеет встроенный метод `forEach`, схожий со встроенным методом массивов `Array`:
- `Object.entries(obj)`, который получает объект и возвращает массив пар ключ-значение для него
- Есть метод `Object.fromEntries`, который делает противоположное: получив массив пар вида `[ключ, значение]`, он создаёт из них объект:
- Также мы можем использовать `Object.fromEntries`, чтобы получить обычный объект из `Map`
```js
let map = new Map();

map.set("1", "str1");    // строка в качестве ключа
map.set(1, "num1");      // цифра как ключ
map.set(true, "bool1");  // булево значение как ключ

// помните, обычный объект Object приводит ключи к строкам?
// Map сохраняет тип ключей, так что в этом случае сохранится 2 разных значения:
alert(map.get(1)); // "num1"
alert(map.get("1")); // "str1"
alert(map.size); // 3

let john = { name: "John" };
// давайте сохраним количество посещений для каждого пользователя
let visitsCountMap = new Map();
// объект john - это ключ для значения в объекте Map
visitsCountMap.set(john, 123);
alert(visitsCountMap.get(john)); // 123

map.set("1", "str1")
  .set(1, "num1")
  .set(true, "bool1");

let recipeMap = new Map([
  ["огурец", 500],
  ["помидор", 350],
  ["лук",    50]
]);

// перебор по ключам (овощи)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // огурец, помидор, лук
}

// перебор по значениям (числа)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// перебор по элементам в формате [ключ, значение]
for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
  alert(entry); // огурец,500 (и так далее)
}

// выполняем функцию для каждой пары (ключ, значение)
recipeMap.forEach((value, key, map) => {
  alert(`${key}: ${value}`); // огурец: 500 и так далее
});

// массив пар [ключ, значение]
let map = new Map([
  ['name',  'John'],
  ['age',    30],
]);

alert( map.get('age') ); // 30
let obj = {
  name: "John",
  age: 30
};
let map = new Map(Object.entries(obj));
alert( map.get('name') ); // John

let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);
// prices = { banana: 1, orange: 2, meat: 4 }
alert(prices.orange); // 2

let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);
let obj = Object.fromEntries(map.entries());

let obj = Object.fromEntries(map); // убрать .entries()
```
# Set

Объект Set – это особый вид коллекции: «множество» значений (без ключей), где каждое значение может появляться только один раз.
Его основные методы это:
- new Set(iterable) – создаёт Set, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый Set.
- set.add(value) – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
- set.delete(value) – удаляет значение, возвращает true, если value было в множестве на момент вызова, иначе false.
- set.has(value) – возвращает true, если значение присутствует в множестве, иначе false.
- set.clear() – удаляет все имеющиеся значения.
- set.size – возвращает количество элементов в множестве.
- Основная «изюминка» – это то, что при повторных вызовах set.add() с одним и тем же значением ничего не происходит, за счёт этого как раз и получается, что каждое значение появляется один раз.
- Перебор с помощью for...of
```js
let set = new Set(["апельсин", "яблоко", "банан"]);

for (let value of set) alert(value);

// то же самое с forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```
[Это сделано для совместимости с объектом `Map`, в котором колбэк `forEach` имеет 3 аргумента. Выглядит немного странно, но в некоторых случаях может помочь легко заменить `Map` на `Set` и наоборот.]
Set имеет те же встроенные методы, что и Map:
- `set.values()` – возвращает перебираемый объект для значений,
- `set.keys()` – то же самое, что и `set.values()`, присутствует для обратной совместимости с Map,
- `set.entries()` – возвращает перебираемый объект для пар вида `[значение, значение]`, присутствует для обратной совместимости с Map.

# WeakMap и WeakSet

Как мы знаем из главы Сборка мусора, движок JavaScript хранит значения в памяти до тех пор, пока они достижимы (то есть, эти значения могут быть использованы).
- Аналогично, если мы используем объект как ключ в Map, то до тех пор, пока существует Map, также будет существовать и этот объект
```js
let john = { name: "John" };
// объект доступен, переменная john — это ссылка на него
// перепишем ссылку
john = null;
// объект будет удалён из памяти
john = { name: "John" };
let array = [ john ];
john = null; // перезаписываем ссылку на объект
// объект john хранится в массиве, поэтому он не будет удалён сборщиком мусора
// мы можем взять его значение как array[0]
```
- WeakMap – принципиально другая структура в этом аспекте. Она не предотвращает удаление объектов сборщиком мусора, когда эти объекты выступают в качестве ключей.
- Первое его отличие от Map в том, что ключи в WeakMap должны быть объектами, а не примитивными значениями:
- Теперь, если мы используем объект в качестве ключа и если больше нет ссылок на этот объект, то он будет удалён из памяти (и из объекта WeakMap) автоматически.
- WeakMap не поддерживает перебор и методы keys(), values(), entries(), так что нет способа взять все ключи или значения из неё.
В WeakMap присутствуют только следующие методы:
- weakMap.get(key)
- weakMap.set(key, value)
- weakMap.delete(key)
- weakMap.has(key)
[Решение о том, когда делать сборку мусора, принимает движок JavaScript. Он может посчитать необходимым как удалить объект прямо сейчас, так и отложить эту операцию, чтобы удалить большее количество объектов за раз позже. Так что технически количество элементов в коллекции WeakMap неизвестно. Движок может произвести очистку сразу или потом, или сделать это частично. По этой причине методы для доступа ко всем сразу ключам/значениям недоступны.]
- В основном, WeakMap используется в качестве дополнительного хранилища данных в виде коллекции, например, количеств его посещений по ключу visitsCountMap.set(user, count + 1);
- Другая частая сфера применения – это кеширование, когда результат вызова функции должен где-то запоминаться («кешироваться») для того, чтобы дальнейшие её вызовы на том же объекте могли просто брать уже готовый результат, повторно используя его.
```js
let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "ok"); // работает (объект в качестве ключа)
// нельзя использовать строку в качестве ключа
weakMap.set("test", "Whoops"); // Ошибка, потому что "test" не объект

obj = null; // перезаписываем ссылку на объект
// объект obj удалён из памяти!
```

```js
// 📁 cache.js
let cache = new WeakMap();

// вычисляем и запоминаем результат
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* вычисляем результат для объекта */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* какой-то объект */};

let result1 = process(obj);
let result2 = process(obj);

// ...позже, когда объект больше не нужен:
obj = null;

// Нет возможности получить cache.size, так как это WeakMap,
// но он равен 0 или скоро будет равен 0
// Когда сборщик мусора удаляет obj, связанные с ним данные из кеша тоже удаляются
```

## WeakSet

Коллекция WeakSet ведёт себя похоже:
- Она аналогична Set, но мы можем добавлять в WeakSet только объекты (не примитивные значения).
- Объект присутствует в множестве только до тех пор, пока доступен где-то ещё.
- Как и Set, она поддерживает add, has и delete, но не size, keys() и не является перебираемой.


```js
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John заходил к нам
visitedSet.add(pete); // потом Pete
visitedSet.add(john); // John снова

// visitedSet сейчас содержит двух пользователей

// проверим, заходил ли John?
alert(visitedSet.has(john)); // true

// проверим, заходила ли Mary?
alert(visitedSet.has(mary)); // false

john = null;

// структура данных visitedSet будет очищена автоматически (объект john будет удалён из visitedSet)
```
Наиболее значительным ограничением WeakMap и WeakSet является то, что их нельзя перебрать или взять всё содержимое. Это может доставлять неудобства, но не мешает WeakMap/WeakSet выполнять их главную задачу – быть дополнительным хранилищем данных для объектов, управляемых из каких-то других мест в коде.

# Object.keys, values, entries

Методы поддерживаются для структур:
- Map
- Set
- Array

Для простых объектов доступны следующие методы:
- `Object.keys(obj)` – возвращает массив ключей.
- `Object.values(obj)` – возвращает массив значений.
- `Object.entries(obj)` – возвращает массив пар `[ключ, значение]`.
Второе отличие в том, что методы вида `Object.*` возвращают «реальные» массивы, а не просто итерируемые объекты. Это в основном по историческим причинам.
- Object.keys/values/entries игнорируют символьные свойства. Так же, как и цикл for..in, эти методы игнорируют свойства, использующие Symbol(...) в качестве ключей.
```js
let user = {
  name: "John",
  age: 30
};
Object.keys(user); // = ["name", "age"]
Object.values(user); // = ["John", 30]
Object.entries(user); // = [ ["name","John"], ["age",30] ]
```

# Деструктурирующее присваивание

В JavaScript есть две чаще всего используемые структуры данных – это Object и Array.
- Объекты позволяют нам создавать одну сущность, которая хранит элементы данных по ключам.
- Массивы позволяют нам собирать элементы данных в упорядоченный список.

Но когда мы передаём их в функцию, то ей может понадобиться не объект/массив целиком, а элементы по отдельности.

*Деструктурирующее присваивание – это специальный синтаксис, который позволяет нам «распаковать» массивы или объекты в несколько переменных, так как иногда они более удобны.*

## Деструктуризация массива
- «Деструктурирующее присваивание»  - только копирует нужные значения в переменные.
- Пропускайте элементы, используя запятые;
- Работает с любым перебираемым объектом с правой стороны;
- Присваивайте чему угодно с левой стороны.
- Цикл с `.entries()`. Мы можем использовать его с деструктуризацией для цикличного перебора ключей и значений объекта.
- Трюк обмена переменных.
```js
// у нас есть массив с именем и фамилией
let arr = ["Ilya", "Kantor"];
// деструктурирующее присваивание
// записывает firstName = arr[0]
// и surname = arr[1]
let [firstName, surname] = arr;

let [firstName, surname] = "Ilya Kantor".split(' ');
alert(firstName); // Ilya
alert(surname);  // Kantor

let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
alert( title ); // Consul

let [a, b, c] = "abc";
let [one, two, three] = new Set([1, 2, 3]);

let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');
alert(user.name); // Ilya
alert(user.surname); // Kantor

let user = {
  name: "John",
  age: 30
};
// цикл по ключам и значениям
for (let [key, value] of Object.entries(user)) {
  alert(`${key}:${value}`); // name:John, затем age:30
}

let guest = "Jane";
let admin = "Pete";
// Давайте поменяем местами значения: сделаем guest = "Pete", а admin = "Jane"
[guest, admin] = [admin, guest];
alert(`${guest} ${admin}`); // Pete Jane (успешно заменено!)
```
Теперь мы можем использовать переменные вместо элементов массива.

## Остаточные параметры «…»
Обычно, если массив длиннее, чем список слева, «лишние» элементы опускаются.\
Если мы хотим не просто получить первые значения, но и собрать все остальные, то мы можем добавить ещё один параметр, который получает остальные значения, используя оператор «остаточные параметры» – троеточие ("..."):
```js
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// Дальнейшие элементы нигде не присваиваются

let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
```
Переменная rest является массивом из оставшихся элементов.

## Значения по умолчанию
- Если в массиве меньше значений, чем в присваивании, то ошибки не будет. Отсутствующие значения считаются неопределёнными.
- Если мы хотим, чтобы значение «по умолчанию» заменило отсутствующее, мы можем указать его с помощью =.

```js
let [firstName, surname] = [];

alert(firstName); // undefined
alert(surname); // undefined

// значения по умолчанию
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
alert(name);    // Julius (из массива)
alert(surname); // Anonymous (значение по умолчанию)
```
## Деструктуризация объекта
У нас есть существующий объект с правой стороны, который мы хотим разделить на переменные. \
Левая сторона содержит «шаблон» для соответствующих свойств. В простом случае это список названий переменных в {...}.
- Порядок не имеет значения.
- мы можем использовать двоеточие для переименования.
- допустимы значения по умолчанию.
```js
let {var1, var2} = {var1:…, var2:…}

let options = {
  title: "Menu",
  width: 100,
  height: 200
};
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
let {width: w = 100, height: h = 200, title} = options;
```

## Остаток объекта «…»
Мы может взять необходимые нам свойства объекта и присвоить из переменных, а все остальные оставшиеся в одну переменную.
```js
// title = свойство с именем title
// rest = объект с остальными свойствами
let {title, ...rest} = options;

let title, width, height;
// ошибка будет в этой строке
{title, width, height} = {title: "Menu", width: 200, height: 100};
// сейчас всё работает, показали что это не блок кода
({title, width, height} = {title: "Menu", width: 200, height: 100});
alert( title ); // Menu
{
  // блок кода
  let message = "Hello";
  // ...
  alert( message );
}
```
[Проблема в том, что JavaScript обрабатывает {...} в основном потоке кода (не внутри другого выражения) как блок кода. Такие блоки кода могут быть использованы для группировки операторов, например:]

## Вложенная деструктуризация
Если объект или массив содержит другие вложенные объекты или массивы, то мы можем использовать более сложные шаблоны с левой стороны, чтобы извлечь более глубокие свойства.
```js
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};
// деструктуризация разбита на несколько строк для ясности
let {
  size: { // положим size сюда
    width,
    height
  },
  items: [item1, item2], // добавим элементы к items
  title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
} = options;
```

## Умные параметры функций
Есть ситуации, когда функция имеет много параметров, большинство из которых не обязательны. \
Мы можем передать параметры как объект, и функция немедленно деструктурирует его в переменные.

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
// undefined там, где подходят значения по умолчанию
// Это выглядит ужасно. И становится нечитаемым, 
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])

function({
  incomingProperty: varName = defaultValue
  ...
})

showMenu({}); // ок, все значения - по умолчанию
showMenu(); // так была бы ошибка
```
[Пожалуйста, обратите внимание, что такое деструктурирование подразумевает, что в showMenu() будет обязательно передан аргумент. Если нам нужны все значения по умолчанию, то нам следует передать пустой объект:]
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