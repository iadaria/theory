import './index.css';
import ReferenceCatFriends from './ReferenceCatFriends';
import {ReferenceCounter} from './ReferenceCounter';
import {ReferenceForm} from './ReferenceForm';
import {ReferenceStopWatch} from './ReferenceStopWatch';

export function Reference() {
	let example;
	example = <ReferenceStopWatch />;
	example = <ReferenceCounter />;
	example = <ReferenceForm />;
	example = <ReferenceCatFriends />;

	return example;
}
