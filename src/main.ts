import {ComputationWorkerImpl} from "./computation-worker/computation-worker-impl";
import {ComputationWorker} from "./computation-worker/computation-worker";
import {createObjects} from "./utils/object-util";

// Example usage
const main = async () : Promise<void> => {
    const workerArray: ComputationWorkerImpl[] = createObjects(4, ComputationWorkerImpl);

    try {
        const values : any[] = await Promise.all(
            [...workerArray.map((worker: ComputationWorker) => worker.execute('fibonacci', [40]))]
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