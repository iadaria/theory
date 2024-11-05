import './index.css';
import {useState, useRef} from 'react';

type Todo = {id: number; text: string};
let nextId = 0;
let initialTodos: Todo[] = [];
for (let i = 0; i < 20; i++) {
	initialTodos.push({
		id: nextId++,
		text: 'Todo #' + (i + 1),
	});
}

export function ReferenceTodoList() {
	const listRef = useRef<any>(null);
	const [text, setText] = useState('');
	const [todos, setTodos] = useState(initialTodos);

	function handleAdd() {
		const newTodo = {id: nextId++, text: text};

		setText('');
		setTodos([...todos, newTodo]);

		listRef?.current?.lastChild?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});
	}

	return (
		<>
			<button onClick={handleAdd}>Add</button>
			<input value={text} onChange={(e) => setText(e.target.value)} />
			<ul ref={listRef}>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.text}</li>
				))}
			</ul>
		</>
	);
}
