


import {createMathComputationalWorkers} from "./computation-worker/calculation-worker";
import {ComputationWorker} from "./computation-worker/computation-worker";
import {createHttpRequestWorkers} from "./computation-worker/http-request-worker";
import {apiUrl} from "./tasks-store/http-tasks";
import {resolve} from "node:dns/promises";

// Example usage
const main = async () : Promise<void> => {
    const workerArray: ComputationWorker[] = createMathComputationalWorkers(3);
    const workers: ComputationWorker[] = createHttpRequestWorkers(4);

    workers.map(worker =>
        new Promise((resolve, reject) => {
            worker.onSuccess(resolve);
            worker.onError(reject);
            worker.execute(apiUrl, []);
        })
    );

    try {
        const values : any[] = await Promise.all(
            [
                ...workerArray.map((worker: ComputationWorker) => worker.execute('fibonacci', [40])),
                ...workerArray.map((worker: ComputationWorker) => worker.execute('factoriel', [10])),
            ]
        );
        const res : any = await Promise.all( [
            ...workers
        ])
        console.log('Sum of values :', values.reduce( (previousValue, currentValue) => (previousValue + currentValue), 0));
        console.log('responses :', res);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Ensure worker termination even if there's an unhandled error
        workerArray.forEach((worker: ComputationWorker) => worker.terminate())
        workers.forEach((worker: ComputationWorker) => worker.terminate())
    }
};

main();