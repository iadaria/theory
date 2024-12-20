export type Task = {id: number; text: string; done: boolean};

export type Action = {type: string; task?: Task} & Partial<Task>;

export const initialTasks: Task[] = [
	{id: 0, text: 'Philosopher’s Path', done: true},
	{id: 1, text: 'Visit the temple', done: false},
	{id: 2, text: 'Drink matcha', done: false},
];
