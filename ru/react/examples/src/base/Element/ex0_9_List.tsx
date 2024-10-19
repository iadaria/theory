export function NumberList({ numbers }: { numbers: number[]}) {
    const listItems = numbers.map((number) => <li>{number}</li>)

    return <ul>{listItems}</ul>
}

