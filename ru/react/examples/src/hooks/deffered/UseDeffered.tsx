import {Suspense, useDeferredValue, useEffect, useState} from 'react';

function Counter() {
    let count = 0;
    return function() {
        return count++;
    }
}

function SearchResults({query}: any) {
    console.log('Searching...')

    if (!query) {
        return null;
    }
  
	let startTime = performance.now();
	while (performance.now() - startTime < 50) {
		//console.log(performance.now());
		// Do nothing for 1 ms per item to emulate extremely slow code
	}
	return <p>{`No matches for ${query}`}</p>;
}

export function UseDeffered() {
	const [query, setQuery] = useState('');
	const deferredQuery = useDeferredValue(query);
	return (
		<>
			<label>
				Search albums:
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</label>
			<Suspense fallback={<h2>Loading...</h2>}>
				<p>hi there</p>
				<SearchResults query={deferredQuery} />
			</Suspense>
		</>
	);
}
