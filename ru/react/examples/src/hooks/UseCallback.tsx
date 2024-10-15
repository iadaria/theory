import { FC, memo, useCallback, useState } from "react";

type Text = { text: string}

const initialItems: Text[] = [
  { text: 'text1'},
  { text: 'text2'}, 
  { text: 'text3'}
];
const randomString = () => (Math.random() + 1).toString(36).substring(7);

interface NewTodoProps {
  addItem: () => void
}

export const NewTodo: FC<NewTodoProps> = memo(({ addItem}) => {
  console.log('render NewTodo');

  return <div><button onClick={addItem}>New todo</button></div>
})

function List({ items }: { items: Text[]}): JSX.Element {
  console.log('List rendered')
  // const log = useCallback(() => console.log(`Render ${items.length} items`), [items.length]);

  // useEffect(() => {
  //   log();
  // }, [log])

  
  const items2 = items.map((item, key) => (
    <div key={key}>item: {item.text}</div>
  ));

  return <>{items2}</>
}

const Test = memo(() =>  {
  console.log('render Test')
  return <p>Test</p>
});

export function UseCallback() {
    const [items, setItems] = useState(initialItems); 

    const addItem2 = useCallback(() => {
      setItems((prev) => [...prev, { text: randomString() }])
    }, [])
    
    return (
      <div>
      <NewTodo addItem={addItem2} />
      <Test />
      <List items={items} />
    </div>
    )
    
}