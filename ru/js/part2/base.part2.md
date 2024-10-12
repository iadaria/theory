# Браузерное окружение и спецификации

Язык JavaScript изначально был создан для веб-браузеров и превратился в кроссплатформенный язык программирования. Сегодня JavaScript может использоваться в браузере, на веб-сервере или в какой-то другой среде, даже в кофеварке. Каждая среда предоставляет свою функциональность, которую спецификация JavaScript называет "окружением".

Окружение предоставляет свои объекты и дополнительные функции, в дополнение базовым языковым. Браузеры, например, дают средства для управления веб-страницами. Node.js делает доступными какие-то серверные возможности и так далее.

На картинке ниже в общих чертах показано, что доступно для JavaScript в браузерном окружении:

![browser-environment](../../../_img//windowObjects.svg)

window - корневой объект, выступает в 2-х ролях:
1) это глобальный объект для JavaScript-кода
2) он также представляет собой окно браузера и располагает методами для управления им.
Здесь мы используем window как глобальный объект.
И window как объект окна браузера, чтобы узнать его высоту:
```js
function sayHi() {
  alert("Hello");
}
// глобальные функции доступны как методы глобального объекта:
window.sayHi();
alert(window.innerHeight); // внутренняя высота окна браузера
```
Document Object Model, сокращённо DOM – объектная модель документа, которая представляет все содержимое страницы в виде объектов, которые можно менять.
Объект document – основная «входная точка». С его помощью мы можем что-то создавать или менять на странице.
```js
// заменим цвет фона на красный,
document.body.style.background = "red";
// а через секунду вернём как было
setTimeout(() => document.body.style.background = "", 1000);
```
!DOM – не только для браузеров.
Спецификация DOM описывает структуру документа и предоставляет объекты для манипуляций со страницей. Существуют и другие, отличные от браузеров, инструменты, использующие DOM.
Например, серверные скрипты, которые загружают и обрабатывают HTML-страницы, также могут использовать DOM. При этом они могут поддерживать спецификацию не полностью.

(*) CSSOM для стилей
- Правила стилей CSS(Cascading Style Sheets «каскадные таблицы стилей») структурированы иначе чем HTML. Для них есть отдельная спецификация CSSOM(CSS Object Model), которая объясняет, как стили должны представляться в виде объектов, как их читать и писать.
- CSSOM используется вместе с DOM при изменении стилей документа. В реальности CSSOM требуется редко, обычно правила CSS статичны. Мы редко добавляем/удаляем стили из JavaScript, но и это возможно.

(*) BOM (Browser Object Model)
Объектная модель браузера (Browser Object Model, BOM) – это дополнительные объекты, предоставляемые браузером (окружением), чтобы работать со всем, кроме документа.
Например:
- Объект navigator даёт информацию о самом браузере и операционной системе. Среди множества его свойств самыми известными являются: navigator.userAgent – информация о текущем браузере, и navigator.platform – информация о платформе (может помочь в понимании того, в какой ОС открыт браузер – Windows/Linux/Mac и так далее).
- Объект location позволяет получить текущий URL и перенаправить браузер по новому адресу.
Функции alert/confirm/prompt тоже являются частью BOM: они не относятся непосредственно к странице, но представляют собой методы объекта окна браузера для коммуникации с пользователем.
```js
alert(location.href); // показывает текущий URL
if (confirm("Перейти на Wikipedia?")) {
  location.href = "https://wikipedia.org"; // перенаправляет браузер на другой URL
}
```
# DOM дерево
Основой HTML-документа являются теги.
В соответствии с объектной моделью документа («Document Object Model», коротко DOM), каждый HTML-тег является объектом. Вложенные теги являются «детьми» родительского элемента. Текст, который находится внутри тега, также является объектом.
Все эти объекты доступны при помощи JavaScript, мы можем использовать их для изменения страницы.
Например, document.body – объект для тега <body>.
Если запустить этот код, то <body> станет красным на 3 секунды:
```js
document.body.style.background = 'red'; // сделать фон красным
setTimeout(() => document.body.style.background = '', 3000); // вернуть назад
```
Начнём с такого, простого, документа:
```html
<!DOCTYPE HTML>
<html>
<head>
  <title>О лосях</title>
</head>
<body>
  Правда о лосях.
</body>
</html>
```
DOM – это представление HTML-документа в виде дерева тегов. Вот как оно выглядит: ![](../../../_img/tags-tree.png)

Каждый узел этого дерева – это объект.
Теги являются узлами-элементами (или просто элементами). Они образуют структуру дерева: <html> – это корневой узел, <head> и <body> его дочерние узлы и т.д.

Текст внутри элементов образует текстовые узлы, обозначенные как #text. Текстовый узел содержит в себе только строку текста. У него не может быть потомков, т.е. он находится всегда на самом нижнем уровне.

Например, в теге <title> есть текстовый узел "О лосях".

Обратите внимание на специальные символы в текстовых узлах:
- перевод строки: ↵ (в JavaScript он обозначается как \n)
- пробел: ␣

```js
```

```js
```

```js
```
