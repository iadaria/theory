# Чистые компоненты

Нужно соблюдать чистоту компонентов.

# Чистая функция - это
Чистые функции выполняют только вычисления и ничего более.
1. Она не изменяет никаких объектов или переменных, существовавших до ее вызова.
2. Для одних и тех же параметров?(входных данных), ЧФ ВСЕГДА ДОЛЖНА возвращать один и тот же результат.

Пример: формула y = 2x:
- При х = 2, y = 4 - Всегда
- При х = 3, y = 6 - Всегда. Она не будет равна 9 или -1 в зависимости, например, от времени суток.
Реализуем ее в JS. Получим __чистую функцию__:
```ts
function double(number) {
    return 2 * number;
}
```
React разработан на основе этой концепции. React предполагает, что каждый написанный вами компонент является чистой функцией.

# Побочные эффекты: (не)запланированные последствия

Процесс рендеринга в React всегда должен быть чистым. Компоненты должны только возвращать свой JSX, но не изменять какие-либо объекты или переменные, существовавшие до рендеринга — это сделает их нечистыми!

Пример с нарушением правил чистой функции [Ex1]
```ts
let guest = 0;

function Cup() {
    // Плохо: изменение существовавшей переменной!
    guest = guest + 1;
    return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
    return (
        <>
            <Cup />
            <Cup />
            <Cup />
        </>
    );
}

/**
* Result:
    Tea cup for guest #2
    Tea cup for guest #4
    Tea cup for guest #6
 */
```
[1]

?[ каждый компонент должен "думать только за себя", и не пытаться координировать свою работу с другими или зависеть от них во время рендеринга. Рендеринг — это как школьный экзамен: каждый компонент должен вычислять JSX самостоятельно!]

В React 3-и вида входных данных, которые мы можем читать во время рендеринга: props, state и context. Вы всегда должны рассматривать эти входы как доступные только для чтения.

[2] [3]

# Строгий режим
Для перехода в строгий режим оборачиваем корневой компонент в `<React.StrictMode>`.
*Вызывая функции компонента дважды, "Строгий режим" помогает найти компоненты, которые нарушают эти правила.* (1)

В примере выше:
- мы получим:
```ts
/**
* Result:
    Tea cup for guest #2
    Tea cup for guest #4
    Tea cup for guest #6
 */
```
- вместо результата от чистой функции:
```ts
/**
* Result:
    Tea cup for guest #1
    Tea cup for guest #2
    Tea cup for guest #3
 */
```
Вызывая функцию два раза, мы получаем два разных JSX.\
Вызывая чистую функцию два раза, мы получаем два одинаковых JSX.\

*Чистые функции только вычисляют, поэтому вызов их дважды ничего не изменит*
[4]

## Локальная мутация
[Ex1] изменял *предшествующую* переменную во время рендеринга. Это называется *"мутацией"*!\
- Чистые функции не мутируют переменные/объекты вне области видимости функции, созданные до вызова.\
- *Однако совершенно нормально изменять переменные/объекты, которые вы только что создали во время рендеринга.*

[Ex2] Пример мутирования созданной переменной
```tsx
function Cup({ guest }) {
    return <h2>Tea cup for guest #{guest}</h2>;
}
export default function TeaGathering() {
    let cups = [];
    for (let i = 1; i <= 10; i++) {
        cups.push(<Cup key={i} guest={i} />);
    }
    return cups;
}
```
Никакой код вне TeaGathering никогда не узнает, что компонент создал переменную массив cups и добавляли в нее элементы. Это называется "локальная мутация".

# Где вы можете вызвать побочные эффекты
Хотя функциональное программирование в значительной степени полагается на чистоту, в какой-то момент, где-то, что-то должно измениться. В этом и заключается смысл программирования! Эти изменения — обновление экрана, запуск анимации, изменение данных — называются побочными эффектами. Они происходят "на стороне", не во время рендеринга.

В React сторонние эффекты обычно находятся внутри обработчиков событий. Обработчики событий — это функции, которые React запускает при выполнении какого-либо действия — например, при нажатии на кнопку. Несмотря на то, что обработчики событий определяются внутри вашего компонента, они не выполняются во время рендеринга! *Поэтому обработчики событий не обязательно должны быть чистыми.*

! Если вы исчерпали все другие варианты и не можете найти подходящий обработчик событий для вашего побочного эффекта, вы все равно можете прикрепить его к возвращаемому JSX с помощью вызова useEffect в вашем компоненте. Это говорит React выполнить его позже, после рендеринга, когда побочные эффекты разрешены. Однако этот подход должен быть вашим последним вариантом.

[q5]

Помните, что React не гарантирует, что функции компонентов будут выполняться в каком-либо определенном порядке, поэтому вы не можете взаимодействовать между ними, задавая переменные.
```tsx
```

```tsx
```

```tsx
```