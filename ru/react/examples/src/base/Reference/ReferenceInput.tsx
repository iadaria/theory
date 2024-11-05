import {useRef} from 'react';

function MyInput(props: any) {
	return <input {...props} />;
}

export function ReferenceInput() {
	const inputRef = useRef<HTMLInputElement>(null);

	function handleClick() {
		console.log({input: inputRef.current});
		inputRef?.current?.focus();
	}

	return (
		<>
			<MyInput ref={inputRef} />
			<button onClick={handleClick}>Focus the input</button>
		</>
	);
}
