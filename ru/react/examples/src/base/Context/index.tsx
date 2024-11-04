import ContextPage from './ContextPage/ContextPage';
import ContextPageTwo from './ContextPage/ContextPageTwo';
import {NoContextPage} from './ContextPage/NoContextPage';
import {ContextWithReducer} from './ContextWithReducer';

export function Context() {
	let example;
	example = <NoContextPage />;
	example = <ContextPage />;
	example = <ContextPageTwo />;
	example = <ContextWithReducer />;
	return example;
}
