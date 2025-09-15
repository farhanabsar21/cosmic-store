"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createStore: () => createStore
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
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
    return (0, import_react.useSyncExternalStore)(
      subscribe,
      () => selector(state),
      () => selector(state)
    );
  }
  return { get, set, useStore, actions: storeActions };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createStore
});
