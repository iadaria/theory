Здесь рассмотрим базовые принципы:
1 JSX
2 Elements
3 Components

# 0. React
React  — это декларативная, эффективная и гибкая JavaScript библиотека для создания пользовательских интерфейсов.

# 1. JSX
*Это JSX — расширение языка JavaScript.* Объяснить React, как должен выглядеть UI.\
JSX создает «элементы» React. ? элементы рендерятся в DOM ...

*Вместо разделения технологий: логики и разметки в разные файлы, React разделяет ответственность с помощью слабосвязанных единиц - называемых "компоненты", которые содержат и РАЗМЕТКУ, и ЛОГИКУ.*\
[Разделение можно увидеть в фреймворках Model-View-Controller: Laravel, ASP.net, - где разделена на логику приложения(код в Controller),пользовательский интерфейс(View, например html шаблоны) и управления данными(бд, например SQL)]

[Ex0_1] Пример объявления переменной
```tsx
const element = <h1>Привет, мир!</h1>
```
## Встраивание выражений в JSX
JSX допускает использование любых корректных JavaScript-выражений внутри фигурных скобок. Например, `2 + 2`, `user.firstName`

## JSX это тоже выражение
После компиляции каждое JSX-выражение становится обычным вызовом JavaScript-функции, результат которого — объект JavaScript.\
Поэтому JSX можно использовать внутри выражений if и циклов for, присваивать переменным, передавать функции в качестве аргумента и возвращать из функции.\
[Ex0_2] Пример использования JSX-выражения в выражении if, в качестве возвращаемого значения.
```tsx
function getGreeting(user) {
  if (user) {
    return <h1>Здравствуй, {formatName(user)}!</h1>
  }
  return <h1>Здравствуй, незнакомец.</h1>
}
```
## JSX атрибуты
Аттрибуту присваивается либо выражение с помощью фигурных скобок, либо строковый литерал с помощью кавычек.

! Поскольку JSX ближе к JavaScript чем к HTML, React DOM использует стиль именования `camelCase` для свойств вместо обычных имён HTML-атрибутов. Например, `class` становится `className` в JSX.

React DOM экранирует все значения, включенные в JSX перед тем как их отрендерить, предотвращая атаки межсайтовым скриптингом (XSS).[XSS_term]

## JSX - это объекты
Babel компилирует JSX в вызовы `React.createElement()`.
[Ex0_3]Следующие два примера кода эквивалентны между собой:
```tsx
/* JSX */
const element = <h1 className="greeting">Привет, мир!</h1>
/* JS */
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Привет, мир!'
);
```
`React.createElement()` создаёт объект похожий на такой:
```tsx
// Примечание: этот код несколько упрощён.
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Привет, мир!',
  },
}
```
Эти объекты называются React-элементами. Элементы — мельчайшие кирпичики React-приложений. Можно сказать, что они описывают результат, который мы хотим увидеть на экране. React читает эти объекты и использует их, чтобы конструировать и поддерживать DOM.

# 1 Элементы
## Рендеринг элементов

В отличие от DOM-элементов, элементы React — это простые объекты, не отнимающие много ресурсов. React DOM обновляет DOM, чтобы он соответствовал переданным React-элементам.\
*Элементы — это то, из чего состоят компоненты*

Допустим, в вашем HTML-файле есть <div>: `<div id="root"></div>`.\
Мы назовём его «корневым» узлом DOM, так как React DOM будет управлять его содержимым.\
Для рендеринга React-элемента в корневой узел DOM, вызовите ReactDOM.render() с React-элементом и корневым DOM узлом в качестве аргументов:
```tsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
// Получим Hello, world на странице.
```
## Обновление элементов на странице
Элементы React *иммутабельный*. После создания элемента, нельзя изменить его потомков или атрибуты. Элемент похож на кадр в фильме: он отражает состояние интерфейса в конкретный момент времени.\
Пока что, мы знаем только один способ обновить интерфейс — это создать новый элемент и передать его в `ReactDOM.render()`.

[ex0_4] Пример обновления интерфейса с помощью вызова функции для рендеринга элемента.
```tsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  // highlight-next-line
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```
[На практике большинство React-приложений вызывают ReactDOM.render() только один раз.]

## React обновляет только то, что необходимо

React DOM сравнивает элемент и его дочернее дерево с предыдущей версией и вносит в DOM только *минимально необходимые изменения*. [ex0_4]

# 3 Компоненты

Компоненты позволяют разбить интерфейс на независимые части, про которые легко думать в отдельности. Их можно складывать вместе и использовать несколько раз. 

Во многом компоненты ведут себя как обычные функции JavaScript. Они принимают произвольные входные данные (так называемые «пропсы») и возвращают React-элементы, описывающие, что мы хотим увидеть на экране. [q1]

Ещё компоненты можно определять как классы ES6:
```tsx
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>
}
// the same
class Welcome extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>
  }
}
```
С точки зрения React, эти два компонента эквивалентны.

## 3.1 Рендеринг компонента
Пока что мы только встречали React-элементы, представляющие собой DOM-теги. Но элементы могут описывать и наши собственные компоненты.
```tsx
const element = <div />
// Элемент описывает наш собственный компонент
const element = <Welcome name="Алиса" />
```
React собирает все JSX-аттрибуты в один объект(пропсы) и передает их компоненту.

Всегда называйте компоненты с заглавной буквы, иначе React примет его за DOM-тег.

Композиция компонентов: компоненты могут ссылаться на другие компоненты в возвращённом ими дереве. Это позволяет нам использовать одну и ту же абстракцию — компоненты — на любом уровне нашего приложения. \
[На самом верхе у нас обычно компонент App]

Не бойтесь разбивать компонент на части. Чтобы понять извлекать компонент или нет, есть правило: если какая-то часть интерфейса многократно в нём повторяется (Button) или сама по себе достаточно сложная (App), имеет смысл её вынести в независимый компонент. [q2]

- Пропсы можно только читать. *Компонент обязан вести себя как чистая функции по отношению к пропсам*.

# Состояние(state) и жизненный цикл(lifecycle)

«Состояние» очень похоже на пропсы, но оно управляется и доступно только конкретному компоненту.

#
```tsx
```
```tsx
```
#
```tsx
```
```tsx
```
#
```tsx
```
```tsx
```
#
```tsx
```
```tsx
```
```tsx
```