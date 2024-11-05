import {forwardRef, useRef} from 'react';

function MyInputWrong(props: any) {
	return <input {...props} />;
}

const MyInput = forwardRef((props: any, ref) => {
	return <input {...props} ref={ref} />;
});

export function ReferenceInput() {
	const inputRef = useRef<HTMLInputElement>(null);

	function handleClick() {
		console.log({input: inputRef.current});
		inputRef?.current?.focus();
	}

	return (
		<>
			{/** Show an error in the console*/}
			<MyInputWrong ref={inputRef} />
			{/** It works good */}
			<MyInput ref={inputRef} />
			<button onClick={handleClick}>Focus the input</button>
		</>
	);
}
