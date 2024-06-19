/**
 * 本地存储
 * @param key
 * @param value
 */
enum StorageType {
  local,
  session
}

class MyStorage {
  private storage: Storage

  constructor(public type: StorageType) {
    this.storage = type === StorageType.local ? localStorage : sessionStorage
  }

  set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  get(key: string) {
    const value = this.storage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
const local = new MyStorage(StorageType.local)
const session = new MyStorage(StorageType.session)
export { local, session }
