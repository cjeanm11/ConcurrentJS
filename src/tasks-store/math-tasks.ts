export const mathTasks = {
    fibonacci: (n: number): number => {
        if (n <= 1) {
            return n;
        }
        return mathTasks.fibonacci(n - 1) + mathTasks.fibonacci(n - 2);
    },
    factoriel: (n: number): number => {
        if (n <= 1) {
            return n;
        }
        return n * mathTasks.factoriel(n - 1);
    }
};

