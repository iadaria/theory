import {AddTask} from './AddTask';
import {TaskList} from './TaskList';
import {TasksProvider} from './TasksContext';

export function ContextWithReducer() {
	return (
		<TasksProvider>
			<h1>Day off in Kyoto</h1>
			<AddTask />
			<TaskList />
		</TasksProvider>
	);
}
