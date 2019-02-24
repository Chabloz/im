export default class {

  constructor(options = {}) {
    this.options = {
      name: options.name || "default",
      listen: options.listen || true,
      trigger: options.trigger || true
    };
    this._reloadKeys();
    // reload keys when storage change from another tab
    if (this.options.listen) {
      window.addEventListener('storage', evt => {
        this._reloadKeys();
      });
    }
  }

  _reloadKeys() {
    this.storageKeys = Object.keys(localStorage)
      .filter(key => key.startsWith(`${this.options.name}_`))
      .reduce((map, key) => map.set(key.substring(`${this.options.name}_`.length), 1), new Map());
  }

  [Symbol.iterator]() {
    return this.entries();
  }

  keys() {
    return this.storageKeys.keys();
  }

  key(ind) {
    let keys = [...this.keys()];
    if (ind < 0 || ind >= keys.length) return null
    return keys[ind];
  }

  *values() {
    for (let k of this.storageKeys.keys()) {
      yield this.getItem(k);
    }
  }

  *entries() {
    for (let k of this.storageKeys.keys()) {
      yield [k, this.getItem(k)];
    }
  }

  forEach(callback) {
    for (let entrie of this) {
      callback(entrie[1], entrie[0]);
    }
  }

  toArray() {
    return [...this.entries()];
  }

  toObject() {
    let obj = {};
    for (let ent of this) {
      obj[ent[0]] = ent[1];
    }
    return obj;
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }

  get length() {
    return this.storageKeys.size;
  }

  get size() {
    return this.length;
  }

  setItem(key, val) {
    localStorage.setItem(`${this.options.name}_${key}`, JSON.stringify(val));
    this.storageKeys.set(key, 1);
  }

  _genKey() {
    return 'uid_' + Math.random().toString(36).substring(2, 10);
  }

  addItem(val) {
    let key = this._genKey();
    while (this.storageKeys.has(key)) key = this._genKey();
    this.setItem(key, val);
  }

  getItem(key) {
    let val = localStorage.getItem(`${this.options.name}_${key}`);
    if (val == null) return null;
    return JSON.parse(val);
  }

  removeItem(key) {
    localStorage.removeItem(`${this.options.name}_${key}`);
    this.storageKeys.delete(key);
  }

  clear() {
    for (let key of this.keys()) {
      this.removeItem(key);
    }
  }

}
