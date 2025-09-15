import { describe, it, expect } from "vitest";
import { createStore } from "../src";

type State = { count: number };

const store = createStore<State>({ count: 0 }, (set, get) => ({
  increment: () => set({ count: get().count + 1 }),
  decrement: () => set({ count: get().count - 1 }),
}));

describe("store", () => {
  it("should initialize with state", () => {
    expect(store.get().count).toBe(0);
  });

  it("should increment", () => {
    store.actions.increment();
    expect(store.get().count).toBe(1);
  });

  it("should decrement", () => {
    store.actions.decrement();
    expect(store.get().count).toBe(0);
  });
});
