"use client";

import { useSyncExternalStore } from "react";

// Aktuálny čas len v prehliadači (na serveri null), bez setState v useEffect.
let cached: number | null = null;
const subscribe = () => () => {};
const getSnapshot = () => (cached ??= Date.now());
const getServerSnapshot = () => null;

export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
