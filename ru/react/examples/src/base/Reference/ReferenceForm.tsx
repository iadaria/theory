import {useRef} from 'react';

export function ReferenceForm() {
	const inputRef = useRef<HTMLInputElement>(null);

	function handleClick() {
		inputRef?.current?.focus();
	}

	return (
		<>
			<input ref={inputRef} />
			<button onClick={handleClick}>Focus the input</button>
		</>
	);
}
