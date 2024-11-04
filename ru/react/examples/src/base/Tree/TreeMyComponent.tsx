import {useState} from 'react';

export function TreeMyComponent() {
	const [counter, setCounter] = useState(0);

	function MyTextField() {
		const [text, setText] = useState('');

		return (
			<input value={text} onChange={(e) => setText(e.target.value)} />
		);
	}

	return (
		<>
			<MyTextField />
			<button
				onClick={() => {
					setCounter(counter + 1);
				}}
			>
				Clicked {counter} times
			</button>
		</>
	);
}
