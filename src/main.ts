


import {createMathComputationalWorkers} from "./computation-worker/impl/math-computation-worker-impl";
import {ComputationWorker} from "./computation-worker/computation-worker";

// Example usage
const main = async () : Promise<void> => {
    const workerArray: ComputationWorker[] = createMathComputationalWorkers(3);



    try {
        const values : any[] = await Promise.all(
            [
                ...workerArray.map((worker: ComputationWorker) => worker.execute('fibonacci', [40])),
                ...workerArray.map((worker: ComputationWorker) => worker.execute('factoriel', [10])),
                ...workerArray.map((worker: ComputationWorker) => worker.execute('multiply', [10,10]))
            ]
        );
        console.log('Sum of values :', values.reduce( (previousValue, currentValue) => (previousValue + currentValue), 0));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Ensure worker termination even if there's an unhandled error
         workerArray.forEach((worker: ComputationWorker) => worker.terminate())
    }
};

main();