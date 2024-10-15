import GoodVar from './goodVar';
import PreexistingVar from './preexistingVar';

export function PureFunction() {
	return (
		<>
			<PreexistingVar />
			<GoodVar />
		</>
	);
}
