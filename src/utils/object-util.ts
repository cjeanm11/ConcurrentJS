import {ComputationWorker} from "../computation-worker/computation-worker";

export function createWorkers(numOfWorkers: number, constructor: new (...args: any[]) => ComputationWorker, args: any[] = []): ComputationWorker[] {
    return Array.from({ length: numOfWorkers }, (_, index) => {
        return new constructor(...args);
    });
}
