type Middleware<T extends object> = (next: (partial: Partial<T>) => void, get: () => T) => (partial: Partial<T>) => void;
declare function createStore<T extends object>(initialState: T, actions: (set: (partial: Partial<T>) => void, get: () => T) => Record<string, (...args: any[]) => void>, middlewares?: Middleware<T>[]): {
    get: () => T;
    set: (partial: Partial<T>) => void;
    useStore: <U>(selector: (s: T) => U) => U;
    actions: Record<string, (...args: any[]) => void>;
};

export { createStore };
