import { useSyncExternalStore } from "react";

type Listener<T> = (state: T) => void;
type Middleware<T extends object> = (
  next: (partial: Partial<T>) => void,
  get: () => T
) => (partial: Partial<T>) => void;

export function createStore<T extends object>(
  initialState: T,
  actions: (
    set: (partial: Partial<T>) => void,
    get: () => T
  ) => Record<string, (...args: any[]) => void>,
  middlewares: Middleware<T>[] = []
) {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  const get = () => state;

  const baseSet = (partial: Partial<T>) => {
    state = { ...state, ...partial };
    listeners.forEach((l) => l(state));
  };

  const set = middlewares.reduceRight((next, mw) => mw(next, get), baseSet);

  const storeActions = actions(set, get);

  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  function useStore<U>(selector: (s: T) => U): U {
    return useSyncExternalStore(
      subscribe,
      () => selector(state),
      () => selector(state)
    );
  }

  return { get, set, useStore, actions: storeActions };
}
