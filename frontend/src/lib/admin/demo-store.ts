"use client";

import { useCallback, useSyncExternalStore } from "react";
import { listCategories, listBranchOptions, type CategoryView, type BranchOption } from "@/lib/catalog";
import { DB_VERSION, seedDb, type DemoDb } from "./seed";

export * from "./seed";

const DB_KEY = "khans_admin_db_v1";
const AUTH_KEY = "khans_admin_auth_v1";

const dbListeners = new Set<() => void>();
const authListeners = new Set<() => void>();

function emit(listeners: Set<() => void>): void {
  for (const listener of listeners) listener();
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}

export function login(): void {
  window.localStorage.setItem(AUTH_KEY, "1");
  emit(authListeners);
}

export function logout(): void {
  window.localStorage.removeItem(AUTH_KEY);
  emit(authListeners);
}

export function subscribeAuth(listener: () => void): () => void {
  authListeners.add(listener);
  return () => {
    authListeners.delete(listener);
  };
}

export function useIsAuthed(): boolean {
  return useSyncExternalStore(subscribeAuth, isAuthed, () => false);
}

export function getCategories(): CategoryView[] {
  return listCategories();
}

export function getBranches(): BranchOption[] {
  return listBranchOptions();
}

let cache: DemoDb | null = null;

export function loadDb(): DemoDb {
  if (cache) return cache;
  if (typeof window === "undefined") return seedDb();
  try {
    const raw = window.localStorage.getItem(DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DemoDb;
      if (parsed.version === DB_VERSION) {
        cache = parsed;
        return parsed;
      }
    }
  } catch {
    // fall through to reseed
  }
  cache = seedDb();
  persist(cache);
  return cache;
}

function persist(db: DemoDb): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch {
    // storage unavailable — the demo keeps working in memory
  }
}

export function saveDb(db: DemoDb): void {
  cache = db;
  persist(db);
  emit(dbListeners);
}

export function resetDb(): void {
  cache = seedDb();
  persist(cache);
  emit(dbListeners);
}

function subscribeDb(listener: () => void): () => void {
  dbListeners.add(listener);
  return () => {
    dbListeners.delete(listener);
  };
}

export function useDemoDb() {
  const db = useSyncExternalStore(subscribeDb, loadDb, () => null);

  const update = useCallback((mutate: (draft: DemoDb) => void) => {
    const base = cache ?? loadDb();
    const next = JSON.parse(JSON.stringify(base)) as DemoDb;
    mutate(next);
    saveDb(next);
  }, []);

  return { db, update };
}
