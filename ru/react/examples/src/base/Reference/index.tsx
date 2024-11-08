import {ReferenceWrongWorkWithDOM} from './ReferenceWrongWorkWithDOM';
import {ReferenceCatFriends} from './ReferenceCatFriends';
import {ReferenceCounter} from './ReferenceCounter';
import {ReferenceFlashTodoList} from './ReferenceFlashTodoList';
import {ReferenceForm} from './ReferenceForm';
import {ReferenceImperativeInput} from './ReferenceImperativeInput';
import {ReferenceInput} from './ReferenceInput';
import {ReferenceStopWatch} from './ReferenceStopWatch';
import {ReferenceTodoList} from './ReferenceTodoList';

export function Reference() {
	let example;
	example = <ReferenceStopWatch />;
	example = <ReferenceCounter />;
	example = <ReferenceForm />;
	example = <ReferenceCatFriends />;
	example = <ReferenceInput />;
	example = <ReferenceImperativeInput />;
	example = <ReferenceTodoList />;
	example = <ReferenceFlashTodoList />;
	example = <ReferenceWrongWorkWithDOM />;

	return example;
}
