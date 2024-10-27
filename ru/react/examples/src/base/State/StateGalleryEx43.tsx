import {useState} from 'react';
import {sculptureList} from './common/data';

export function StateGallery() {
	const [state, setState] = useState(true);

	console.log(`${StateGallery.name} rendered`);

	let index = 0;

	function handleClick() {
		index = index + 1;

		console.log({index});
	}

	let sculpture = sculptureList[index];
	return (
		<>
			<button onClick={handleClick}>Next</button>
			<h2>
				<i>{sculpture.name} </i>
				by {sculpture.artist}
			</h2>
			<h3>
				({index + 1} of {sculptureList.length})
			</h3>
			<img src={sculpture.url} alt={sculpture.alt} />
			<p>{sculpture.description}</p>
			<button
				onClick={() => {
					// the local variable 'index' will be reset
					setState(!state);
				}}
			>
				render!
			</button>
		</>
	);
}
