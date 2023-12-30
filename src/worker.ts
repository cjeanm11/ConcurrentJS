import { parentPort } from 'worker_threads';
import {tasksStore} from './tasks-store/tasks-store'

if (parentPort) {
    parentPort.on('message', ({ funcName, args }: { funcName: string, args: any[] }) => {
        console.log(`Worker received message to execute function '${funcName}' with args:`, args);
        try {
            const result = tasksStore[funcName](...args);
            console.log(`Worker sending result:`, result);
            parentPort!.postMessage({ result }); // Send the result back to the main thread
        } catch (error) {
            console.error('Worker encountered an error:', error);
            parentPort!.postMessage({ error: error.message });
        }
    });
} else {
    throw new Error('No parent port available. This code should run in a worker thread.');
}
