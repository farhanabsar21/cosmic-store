# @farhan21/cosmic-store

A tiny **React state management library** with hooks, inspired by Zustand & Redux. Lightweight, fully typed, and easy to use.

## 🚀 Installation

```bash
npm install @farhan21/cosmic-store
# or
yarn add @farhan21/cosmic-store
```

## 📖 Usage

```typescript
import { createStore } from "@farhan21/cosmic-store";

type AppState = { count: number; user: string | null };

const appStore = createStore<AppState>(
  { count: 0, user: null },
  (set, get) => ({
    increment: () => set({ count: get().count + 1 }),
    decrement: () => set({ count: get().count - 1 }),
    login: (username: string) => set({ user: username }),
    logout: () => set({ user: null }),
  })
);

export function Counter() {
  const count = appStore.useStore((s) => s.count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={appStore.actions.increment}>+</button>
      <button onClick={appStore.actions.decrement}>-</button>
    </div>
  );
}

export function User() {
  const user = appStore.useStore((s) => s.user);

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user}</p>
          <button onClick={appStore.actions.logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => appStore.actions.login("Alice")}>Login</button>
      )}
    </div>
  );
}
```

## ✨ Features

- ⚡ Tiny API surface — minimal learning curve
- 🔗 Global store with React hooks (`useStore`)
- 🛠 Actions layer like Redux, but simpler
- 🧩 Middleware support (logging, persistence, async)
- 📝 TypeScript first — fully typed

## 🛠 Middleware Example

```typescript
const loggerMiddleware = (next: any, get: any) => (partial: any) => {
  console.log("Prev state:", get());
  next(partial);
  console.log("Next state:", get());
};

const storeWithLogger = createStore(
  { count: 0 },
  (set, get) => ({
    increment: () => set({ count: get().count + 1 }),
  }),
  [loggerMiddleware]
);
```

## 🧪 Testing

```bash
npm run test
```

- Uses **Vitest** for fast and simple testing.
- Fully compatible with TypeScript.

## 📜 License

MIT — free to use and modify 🌟
