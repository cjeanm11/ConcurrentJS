import axios, { AxiosResponse } from 'axios';
import {ComputationWorker} from "../computation-worker";

class HttpRequestWorker implements ComputationWorker {
    private errorCallbacks: ((error: Error) => void)[] = [];
    private successCallbacks: ((result: any) => void)[] = [];

    constructor() {
    }

    async execute(funcName: string, args: any[]): Promise<any> {
        try {
            const response: AxiosResponse = await axios.post(`${funcName}`, { args });

            const result = response.data;

            this.successCallbacks.forEach(callback => callback(result));

            return result;
        } catch (error) {
            this.errorCallbacks.forEach(callback => callback(error));
            throw error;
        }
    }

    onError(callback: (error: Error) => void): void {
        this.errorCallbacks.push(callback);
    }

    onSuccess(callback: (result: any) => void): void {
        this.successCallbacks.push(callback);
    }

    terminate(): void {
    }
}


