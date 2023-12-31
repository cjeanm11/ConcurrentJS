export interface ComputationWorker {
    execute: (funcName: string, args: any[]) => Promise<any> | void;
    onError: (callback: (error: Error) => void) => void;
    onSuccess: (callback: (result: any) => void) => void;
    terminate: () => void;
}

