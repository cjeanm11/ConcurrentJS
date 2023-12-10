import {Worker} from "worker_threads";
import {ComputationWorker} from "./computation-worker";
import * as path from "path";

export class ComputationWorkerImpl implements ComputationWorker {
    private worker: Worker;

    constructor(private workerScriptPath : string = path.resolve(__dirname, '../worker.js') ) {
        this.worker = new Worker(workerScriptPath, { workerData: {} });

        this.worker.on('success', (result) => {
            this.successCallback && this.successCallback(result);
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

    public execute(funcName: string, args: any[]): Promise<any> {

        // Your existing logic to communicate with the worker and resolve/reject
        return new Promise((resolve, reject) => {
            const handleMessage = (message: any) => {
                if (message.result !== undefined) {
                    resolve(message.result);
                } else if (message.error) {
                    reject(new Error(message.error));
                } else {
                    reject(new Error('Unknown error occurred in worker'));
                }
                this.worker.off('message', handleMessage); // Unregister the listener
            };

            this.worker.on('message', handleMessage);
            this.worker.postMessage({ funcName, args });
        });
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

