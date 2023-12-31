import {parentPort} from 'worker_threads';
import {tasksStore} from './tasks-store/tasks-store';

if (parentPort) {
    parentPort.on('message', async ({ funcName, args }) => {
        console.log(`Worker received message to execute function '${funcName}' with args:`, args);
        try {
            const result = await tasksStore[funcName](...args);
            parentPort.postMessage({ result });
        } catch (error) {
            console.error('Worker encountered an error:', error);
            parentPort.postMessage({ error: error.message });
        }
    });
}
