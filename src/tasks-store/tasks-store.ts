export let tasksStore: Record<string, (...args: any[]) => any> = {};

tasksStore.fibonacci = (n: number): number => {
    if (n <= 1) {
        return n;
    }
    return tasksStore.fibonacci(n - 1) + tasksStore.fibonacci(n - 2);
};

tasksStore.factoriel = (n: number): number => {
    if (n <= 1) {
        return n;
    }
    return n * tasksStore.factoriel(n - 1);
};

tasksStore.multiply = (a: number, b: number): number => {
    return a * b;
};
