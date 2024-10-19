# Вопрос 1

Является ли эта функция компонентом? Почему?\
[Расскажите на основе вышеизложенного]

```tsx
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}
```

Ответ:\
Эта функция — компонент, потому что она получает данные в одном объекте («пропсы») в качестве параметра и возвращает React-элемент. Мы будем называть такие компоненты «функциональными», так как они буквально являются функциями.

# Вопрос 2

Извлеките компонент из примера [ex0_4].

Ответ:

```tsx
function Clock(props) {
  return (
    <div>
      <h1>Привет, мир!</h1>
      <h2>Сейчас {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById("root"));
}
setInterval(tick, 1000);
```

# Вопрос 3

Спрячьте логику управления таймером внутри компонента Clock из примера выше, так, чтобы компонент сам себя обновлял, а код начального рендеринга выглядел так:

```ts
function Clock(props) {
  /**/
}

ReactDOM.render(<Clock />, document / getElementById("root"));
```

Ответ:

```tsx
function Clock(props) {
  const [date, setDate] = useState(new Date());

  function tick() {
    setDate(new Date());
  }

  useEffect(() => {
    let timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, []);
  return (
    <div>
      <h1>Привет, мир!</h1>
      <h2>Сейчас {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

ReactDOM.render(<Clock />, document / getElementById("root"));
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

#

```tsx

```

#

```tsx

```
