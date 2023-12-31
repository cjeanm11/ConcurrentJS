import { Worker } from 'worker_threads';
import { ComputationWorker } from './computation-worker';
import * as path from 'path';

export class HttpRequestWorker implements ComputationWorker {
    private worker: Worker;

    constructor(private workerScriptPath: string = path.resolve(__dirname, '../worker.js')) {
        this.worker = new Worker(workerScriptPath, { workerData: {} });

        this.worker.on('message', (message) => {
            if (message.result !== undefined) {
                this.successCallback && this.successCallback(message.result);
            } else if (message.error) {
                this.errorCallback && this.errorCallback(new Error(message.error));
            } else {
                this.errorCallback && this.errorCallback(new Error('Unknown error occurred in worker'));
            }
        });

        this.worker.on('error', (error) => {
            this.errorCallback && this.errorCallback(error);
        });

        this.worker.on('exit', (code) => {
            process.exit(code);
        });
    }

    private successCallback: ((result: any) => void) | null = null;
    private errorCallback: ((error: Error) => void) | null = null;

    public execute(funcName: string, args: any[]): void {
        this.worker.postMessage({ funcName, args });
    }

    public onSuccess(callback: (result: any) => void) {
        this.successCallback = callback;
    }

    public onError(callback: (error: Error) => void) {
        this.errorCallback = callback;
    }

    public terminate() {
        this.worker.terminate();
    }
}

export function createHttpRequestWorkers(numOfWorkers: number): ComputationWorker[] {
    return Array.from({ length: numOfWorkers }, (_, index) => {
        return new HttpRequestWorker();
    });
}
