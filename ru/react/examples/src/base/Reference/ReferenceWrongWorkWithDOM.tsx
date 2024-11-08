import {useRef, useState} from 'react';

export function ReferenceWrongWorkWithDOM() {
	const [show, setShow] = useState(true);
	const ref = useRef<any>(null);

	return (
		<div>
			<button
				onClick={() => {
					setShow(!show);
				}}
			>
				{show ? 'Hide <p>' : 'Show <p>'}
			</button>
			<button
				onClick={() => {
					ref.current.remove();
				}}
			>
				Remove 'p' from the DOM
			</button>
			{show && <p ref={ref}>Hello world</p>}
		</div>
	);
}
