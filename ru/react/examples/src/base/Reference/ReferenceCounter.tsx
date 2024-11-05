import {useRef} from 'react';

export function ReferenceCounter() {
	let ref = useRef(0);

	console.log(ReferenceCounter.name, 'rendered');

	function handleClick() {
		ref.current = ref.current + 1;
		alert('You clicked ' + ref.current + ' times!');
	}

	return (
		<button onClick={handleClick}>
			You clicked {ref.current} times{' '}
		</button>
	);
}

export function ReferenceCounterWithState() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<button onClick={handleClick}>You clicked {count} times</button>
	);
}
