


import {createMathComputationalWorkers} from "./computation-worker/calculation-worker";
import {ComputationWorker} from "./computation-worker/computation-worker";
import {createHttpRequestWorkers} from "./computation-worker/http-request-worker";
import {apiUrl} from "./tasks-store/http-tasks";

// Example usage
const main = async () : Promise<void> => {
    const workerArray: ComputationWorker[] = createMathComputationalWorkers(3);
    const workers: ComputationWorker[] = createHttpRequestWorkers(4);

    try {
        const values : any[] = await Promise.all(
            [
                ...workerArray.map((worker: ComputationWorker) => worker.execute('fibonacci', [40])),
                ...workerArray.map((worker: ComputationWorker) => worker.execute('factoriel', [10])),
            ]
        );
        const res = await Promise.all( [
            ...workers.map((worker: ComputationWorker) => worker.execute(apiUrl, []))
        ])
        console.log('Sum of values :', values.reduce( (previousValue, currentValue) => (previousValue + currentValue), 0));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Ensure worker termination even if there's an unhandled error
        workerArray.forEach((worker: ComputationWorker) => worker.terminate())
    }
};

main();