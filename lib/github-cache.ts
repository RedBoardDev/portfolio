const CACHE_PREFIX = "gh_cache_"

interface CacheEntry<T> {
  data: T
  expiresAt: number
}

export function getCached<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null

    const entry: CacheEntry<T> = JSON.parse(raw)
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(CACHE_PREFIX + key)
      return null
    }

    return entry.data
  } catch {
    return null
  }
}

export function setCache<T>(key: string, data: T, ttlMs: number): void {
  try {
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + ttlMs,
    }
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}
