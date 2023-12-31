import {mathTasks} from "./math-tasks";
import {httpTasks} from "./http-tasks";

type TaskStore = Record<string, (...args: any[]) => any>;
export const tasksStore: TaskStore =  {
    ...mathTasks,
    ...httpTasks
};

