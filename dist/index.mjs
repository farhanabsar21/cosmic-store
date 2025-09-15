// src/index.ts
import { useSyncExternalStore } from "react";
function createStore(initialState, actions, middlewares = []) {
  let state = initialState;
  const listeners = /* @__PURE__ */ new Set();
  const get = () => state;
  const baseSet = (partial) => {
    state = { ...state, ...partial };
    listeners.forEach((l) => l(state));
  };
  const set = middlewares.reduceRight((next, mw) => mw(next, get), baseSet);
  const storeActions = actions(set, get);
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  function useStore(selector) {
    return useSyncExternalStore(
      subscribe,
      () => selector(state),
      () => selector(state)
    );
  }
  return { get, set, useStore, actions: storeActions };
}
export {
  createStore
};
