// the one gateway to browser storage: every read is parsed safely and checked by a type guard,
// so a missing, broken or old-shaped value comes back as null instead of crashing the app
export class StorageService<T> {
  private readonly key: string
  private readonly isValid: (value: unknown) => value is T
  private readonly storage: Storage

  constructor(key: string, isValid: (value: unknown) => value is T, storage: Storage = localStorage) {
    this.key = key
    this.isValid = isValid
    this.storage = storage
  }

  get(): T | null {
    try {
      const raw = this.storage.getItem(this.key)
      if (raw === null) return null
      const parsed: unknown = JSON.parse(raw)
      return this.isValid(parsed) ? parsed : null
    } catch {
      return null
    }
  }

  set(value: T): void {
    this.storage.setItem(this.key, JSON.stringify(value))
  }

  remove(): void {
    this.storage.removeItem(this.key)
  }
}
