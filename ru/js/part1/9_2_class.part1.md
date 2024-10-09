# Статические свойства и методы

Мы также можем присвоить метод самому классу. Такие методы называются статическими. В объявление класса они добавляются с помощью ключевого слова `static`.\
Это фактически то же самое, что присвоить метод напрямую как свойство функции.
- ! Статические методы недоступны для отдельных объектов
```js
class User {
  static staticMethod() {
    alert(this === User);
  }
}

User.staticMethod(); // true
// То же что и
class User { }

User.staticMethod = function() {
  alert(this === User);
};
new User().staticMethod(); /// Error: article.createTodays is not a function
```
Значением `this` при вызове `User.staticMethod()` является сам конструктор класса `User` (правило «объект до точки»).\
[Обычно статические методы используются для реализации функций, которые будут принадлежать классу в целом, но не какому-либо его конкретному объекту.]

## Статические свойства
Они выглядят как свойства класса, но с `static` в начале:
```js
class Article {
  static publisher = "Илья Кантор";
}
```
## Наследование статических свойств и методов
```js
class Animal {
  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }
  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} бежит со скоростью ${this.speed}.`);
  }
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}
// Наследует от Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} прячется!`);
  }
}

let rabbits = [
  new Rabbit("Белый кролик", 10),
  new Rabbit("Чёрный кролик", 5)
];
 // Чёрный кролик бежит со скоростью 5.
rabbits.sort(Rabbit.compare);
rabbits[0].run();

class Animal {}
class Rabbit extends Animal {}
// для статики
alert(Rabbit.__proto__ === Animal); // true
// для обычных методов
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

![](../../../_img/animal-rabbit-static.svg)

Так что `Rabbit extends Animal` создаёт две ссылки на прототип:
1. Функция `Rabbit` прототипно наследует от функции `Animal`.
2. `Rabbit.prototype` прототипно наследует от `Animal.prototype`.

# Приватные и защищённые методы и свойства

В объектно-ориентированном программировании свойства и методы разделены на 2 группы:
1. Внутренний интерфейс – методы и свойства, доступные из других методов класса, но не снаружи класса.
2 Внешний интерфейс – методы и свойства, доступные снаружи класса.
- Защищённые свойства обычно начинаются с префикса `_`.
- Защищённые поля наследуются.\
[Если мы унаследуем class MegaMachine extends CoffeeMachine, ничто не помешает нам обращаться к this._waterAmount или this._power из методов нового класса.\
Таким образом, защищённые поля, конечно же, наследуются. В отличие от приватных полей, в чём мы убедимся ниже.]
- С приватными свойствами такое невозможно: `this['#name']` не работает. Это ограничение синтаксиса сделано для обеспечения приватности.
```js
// Прямо сейчас свойства waterAmount и power публичные.
class CoffeeMachine {
  waterAmount = 0; // количество воды внутри
  constructor(power) {
    this.power = power;
    alert( `Создана кофеварка, мощность: ${power}` );
  }
}
// создаём кофеварку
let coffeeMachine = new CoffeeMachine(100);
// добавляем воды
coffeeMachine.waterAmount = 200;
// Защищенные
class CoffeeMachine {
  _waterAmount = 0;
  set waterAmount(value) {
    if (value < 0) throw new Error("Отрицательное количество воды");
    this._waterAmount = value;
  }
  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }
}
// создаём новую кофеварку
let coffeeMachine = new CoffeeMachine(100);
// устанавливаем количество воды
coffeeMachine.waterAmount = -10; // Error: Отрицательное количество воды
```
## Приватное свойство «#waterLimit»
Приватные свойства и методы должны начинаться с `#`. Они доступны только внутри класса.
```js
class CoffeeMachine {
  #waterLimit = 200;
  #checkWater(value) {
    if (value < 0) throw new Error("Отрицательный уровень воды");
    if (value > this.#waterLimit) throw new Error("Слишком много воды");
  }
}
let coffeeMachine = new CoffeeMachine();
// снаружи нет доступа к приватным методам класса
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error
```
На уровне языка # является специальным символом, который означает, что поле приватное. Мы не можем получить к нему доступ извне или из наследуемых классов. У нас может быть два поля одновременно – приватное #waterAmount и публичное waterAmount.

## Расширение встроенных классов

От встроенных классов, таких как `Array`, `Map` и других, тоже можно наследовать.
- Но встроенные классы – исключение. Они не наследуют статические методы друг друга.

... Дописать
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