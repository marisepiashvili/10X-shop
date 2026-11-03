// JSON from storage has no type, so these check its shape before the app trusts it

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

export function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || isString(value)
}

export function isArrayOf<T>(value: unknown, isItem: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(isItem)
}

// reads and parses a storage key, returning the fallback when the value is missing, broken or the wrong shape
export function readStorage<T>(
  key: string,
  isValid: (value: unknown) => value is T,
  fallback: T,
  storage: Storage = localStorage
): T {
  try {
    const raw = storage.getItem(key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}
