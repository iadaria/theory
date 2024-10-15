import GoodVar from './GoodVar';
import MutateSimpleVariable from './Ex2_MutateSimpleVariable';
import PreexistingVar from './PreexistingVar';

export function PureFunction() {
	const ex1 = (
		<>
			<PreexistingVar />
			<GoodVar />
		</>
	);
	const ex2 = <MutateSimpleVariable />
	return <MutateSimpleVariable />
}
