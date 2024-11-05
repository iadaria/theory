import {forwardRef, useRef, useImperativeHandle} from 'react';

const MyInput = forwardRef((props, ref) => {
	const realInputRef = useRef<any>(null);
	useImperativeHandle(ref, () => ({
		// Only expose focus and nothing else
		focus() {
			realInputRef.current.focus();
		},
	}));
	return <input {...props} ref={realInputRef} />;
});

export function ReferenceImperativeInput() {
	const inputRef = useRef<any>(null);

	function handleClick() {
		inputRef.current.focus();
	}

	return (
		<>
			<MyInput ref={inputRef} />
			<button onClick={handleClick}>Focus the input</button>
		</>
	);
}
