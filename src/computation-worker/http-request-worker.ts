import { Worker } from 'worker_threads';
import { ComputationWorker } from './computation-worker';
import * as path from 'path';

export class HttpRequestWorker implements ComputationWorker {
    private worker: Worker;
    private successCallback: ((result: any) => void) | null = null;
    private errorCallback: ((error: Error) => void) | null = null;

    constructor(private workerScriptPath: string = path.resolve(__dirname, '../worker.js')) {
        this.worker = new Worker(workerScriptPath);

        this.worker.on('message', (message) => {
            if (message.result !== undefined) {
                // Call the success callback if there's a result.
                this.successCallback && this.successCallback(message.result);
            } else if (message.error) {
                // Call the error callback if there's an error.
                this.errorCallback && this.errorCallback(new Error(message.error));
            }
        });

        this.worker.on('error', (error) => {
            this.errorCallback && this.errorCallback(error);
        });

        this.worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            }
        });
    }

    public execute(funcName: string, args: any[]): void {
        this.worker.postMessage({ funcName, args });
    }

    public onSuccess(callback: (result: any) => void): void {
        this.successCallback = callback;
    }

    public onError(callback: (error: Error) => void): void {
        this.errorCallback = callback;
    }

    public terminate(): void {
        this.worker.terminate();
    }
}

export function createHttpRequestWorkers(numOfWorkers: number): ComputationWorker[] {
    return Array.from({ length: numOfWorkers }, () => new HttpRequestWorker());
}