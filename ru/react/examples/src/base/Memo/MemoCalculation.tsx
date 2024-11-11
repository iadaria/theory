import {useMemo} from 'react';

function getFilteredTodos() {
	for (let i = 0; i <= 1000000; i++) {}
	return 'Finished';
}

export function MemoCalculation() {
	console.time('filter array');
	const visibleTodos = getFilteredTodos();
	console.timeEnd('filter array');

	return <p>{visibleTodos}</p>;
}

export function MemoCalculationWithMemo() {
	console.time('filter array');
	const visibleTodos = useMemo(() => {
		return getFilteredTodos(); // Skipped if todos and filter haven't changed
	}, []);
	console.timeEnd('filter array');

	return <p>{visibleTodos}</p>;
}
