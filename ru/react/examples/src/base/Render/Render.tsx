import {RenderClock} from './RenderClock';
import {RenderCounter} from './RenderCounter';
import {RenderCounterWithUpdater} from './RenderCounterWithUpdater';
import {RenderForm} from './RenderForm';

export function Render() {
	let example;
	example = <RenderClock time={new Date()} />;
	example = <RenderForm />;
	example = <RenderCounter />;
	example = <RenderCounterWithUpdater />;
	return example;
}
