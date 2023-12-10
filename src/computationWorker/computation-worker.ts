export interface ComputationWorker {
    execute: (funcName: string, args: any[]) => Promise<any>;
    onError: (callback: (error: Error) => void) => void;
    onSuccess: (callback: (result: any) => void) => void;
    terminate: () => void;
}

