import { createStore } from "cosmic-store";

type AppState = { count: number };

const appStore = createStore<AppState>({ count: 0 }, (set, get) => ({
  increment: () => set({ count: get().count + 1 }),
  decrement: () => set({ count: get().count - 1 }),
}));

export function Counter() {
  const count = appStore.useStore((s) => s.count);
  return (
    <div>
      <p>{count}</p>
      <button onClick={appStore.actions.increment}>+</button>
      <button onClick={appStore.actions.decrement}>-</button>
    </div>
  );
}
