import ContextPage from './ContextPage/ContextPage';
import ContextPageTwo from './ContextPage/ContextPageTwo';
import {NoContextPage} from './ContextPage/NoContextPage';

export function Context() {
	let example;
	example = <NoContextPage />;
	example = <ContextPage />;
	example = <ContextPageTwo />;
	return example;
}
