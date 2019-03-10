/** 
 * Class representing a LocalStorage handler, with JSON and storage's name management 
 *
 * Licence: GNU General Public License v3.0  
 * Author: Nicolas Chabloz  
 */
export default class {

  /**
   * Create a JsonStorage.
   * 
   * @param {Object} [options={}] - Options
   * @param {string} [options.name="default"] - The name of the storage.
   * @param {boolean} [options.listen=true] - Listen to storage events for data update
   * @param {boolean} [options.trigger=true] - Trigger an event on "window" when data is set, changed or deleted in the storage
   * @param {boolean} [options.eventName="jsonstorage"] - The event's name to trigger 
   */  
  constructor(options = {}) {
    this.options = {
      name: options.name || "default",
      listen: options.listen || true,
      trigger: options.trigger || true,
      eventName: options.eventName || "jsonstorage"
    };
    this._reloadKeys();
    // reload keys data when storage change from another tab
    if (this.options.listen) {
      window.addEventListener('storage', evt => {
        if (!evt.key.startsWith(`${this.options.name}_`)) return;
        this._reloadKeys();
        if (this.options.trigger) {
          window.dispatchEvent(new Event(this.options.eventName));
        }
      });
    }
  }

  /**
   * Private method
   */
  _reloadKeys() {
    this.storageKeys = Object.keys(localStorage)
      .filter(key => key.startsWith(`${this.options.name}_`))
      .reduce((map, key) => map.set(key.substring(`${this.options.name}_`.length), 1), new Map());
  }

  /**
   * Returns a new Iterator object that contains an array of [key, value] for each element in the storage
   */
  [Symbol.iterator]() {
    return this.entries();
  }

  /**
   * Returns a new Iterator object that contains the keys for each element in the storage.
   */
  keys() {
    return this.storageKeys.keys();
  }

  /**
   * Returns the name of the nth key in the storage
   * 
   * @param {integer} ind Indice
   */
  key(ind) {
    let keys = [...this.keys()];
    if (ind < 0 || ind >= keys.length) return null
    return keys[ind];
  }

  /**
   * Returns a new Iterator object that contains the values for each element in the storage.
   */
  *values() {
    for (let k of this.keys()) {
      yield this.getItem(k);
    }
  }

  /**
   * Returns a new Iterator object that contains an array of [key, value] for each element in the storage.
   */
  *entries() {
    for (let k of this.keys()) {
      yield [k, this.getItem(k)];
    }
  }

  /**
   * Calls callback once for each key-value pair present in the storage. The callback is called with the value and the key as parameters.
   * 
   * @param {function} callback 
   */
  forEach(callback) {
    for (let entrie of this) {
      callback(entrie[1], entrie[0]);
    }
  }

  /**
   * Return an array of [key, value] for each element in the storage.
   */
  toArray() {
    return [...this.entries()];
  }

  /**
   * Return an object with a propertie key: value for each element in the storage.
   */
  toObject() {
    let obj = {};
    for (let ent of this) {
      obj[ent[0]] = ent[1];
    }
    return obj;
  }

  /**
   * Return a JSON string representing an object with a propertie key: value for each element in the storage.
   */
  toJSON() {
    return JSON.stringify(this.toObject());
  }

  /**
   * Return the numbers of elements in the storage
   */
  get length() {
    return this.storageKeys.size;
  }

  /**
   * Return the numbers of elements in the storage (alias for this.length)
   */
  get size() {
    return this.length;
  }

  /**
   * Add the key and the key's value to the storage, or update that key's value if it already exists
   * 
   * @param {string} key the name of the key you want to create/update.
   * @param {*} val the value you want to give the key you are creating/updating.
   */
  setItem(key, val) {
    localStorage.setItem(`${this.options.name}_${key}`, JSON.stringify(val));
    this.storageKeys.set(key, 1);
    if (this.options.trigger) {
      window.dispatchEvent(new Event(this.options.eventName));
    }
  }

  /**
   * Private method
   */
  _genKey() {
    return 'uid_' + Math.random().toString(36).substring(2, 10);
  }

  /**
   * Add the value with a random unique key to the storage.
   * Return the key.
   * 
   * @param {*} val the value you want to give the key you are creating/updating.
   */
  addItem(val) {
    let key = this._genKey();
    while (this.storageKeys.has(key)) key = this._genKey();
    this.setItem(key, val);    
    return key;
  }

  /**
   * Return the value of the key in the storage. If the key does not exist, null is returned.
   * 
   * @param {string} key the name of the key you want to retrieve the value of.
   */
  getItem(key) {
    let val = localStorage.getItem(`${this.options.name}_${key}`);
    if (val == null) return null;
    return JSON.parse(val);
  }

  /**
   * Remove the key from the storage if it exists. If there is no item associated with the given key, this method will do nothing.
   * 
   * @param {string} the name of the key you want to remove. 
   */
  removeItem(key) {
    localStorage.removeItem(`${this.options.name}_${key}`);
    this.storageKeys.delete(key);
    if (this.options.trigger) {
      window.dispatchEvent(new Event(this.options.eventName));
    }
  }

  /**
   * Clears all keys in the storage
   */
  clear() {
    for (let key of this.keys()) {
      localStorage.removeItem(`${this.options.name}_${key}`);    
    }
    this.storageKeys.clear();
    if (this.options.trigger) {
      window.dispatchEvent(new Event(this.options.eventName));
    }
  }

}
