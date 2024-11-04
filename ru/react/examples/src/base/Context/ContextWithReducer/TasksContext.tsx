import {createContext, useContext, useReducer} from 'react';
import {initialTasks, Task} from './data';

const TasksContext = createContext<Task[]>([]);

const TasksDispatchContext = createContext<any>(null);

export function TasksProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

	return (
		<TasksContext.Provider value={tasks}>
			<TasksDispatchContext.Provider value={dispatch}>
				{children}
			</TasksDispatchContext.Provider>
		</TasksContext.Provider>
	);
}

export function useTasks() {
	return useContext(TasksContext);
}

export function useTasksDispatch() {
	return useContext(TasksDispatchContext);
}

function tasksReducer(tasks: Task[], action: any): Task[] {
	switch (action.type) {
		case 'added': {
			return [
				...tasks,
				{
					id: action.id,
					text: action.text,
					done: false,
				},
			];
		}
		case 'changed': {
			return tasks.map((t) => {
				if (t.id === action.task.id) {
					return action.task;
				} else {
					return t;
				}
			});
		}
		case 'deleted': {
			return tasks.filter((t) => t.id !== action.id);
		}
		default: {
			throw Error('Unknown action: ' + action.type);
		}
	}
}
