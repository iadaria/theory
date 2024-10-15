import GoodVar from "./GoodVar";
import PreexistingVar from "./PreexistingVar";

export function PureFunction() {
	return (
		<>
			<PreexistingVar />
			<GoodVar />
		</>
	);
}
