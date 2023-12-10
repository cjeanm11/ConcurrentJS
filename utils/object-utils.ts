

export function createObjects<T>(numObjects: number, constructor: new (...args: any[]) => T, args: any[] = []): T[] {
    return Array.from({ length: numObjects }, (_, index) => {
        return new constructor(...args); // Use spread operator to pass arguments
    });
}
