import "./style.css";

class HashMap {
  constructor(storageLimit = 16) {
    this.storageLimit = storageLimit;
    this.storage = [];
    this.numElements = 0;
    this.numBuckets = 0;
    this.loadFactorNumber = this.storageLimit * 0.75;
  }
  hash(string, max = this.storageLimit) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }

    return hashCode % max;
  }
  checkLoadFactor() {
    if (this.numBuckets > this.loadFactorNumber) {
      return true;
    } else {
      return false;
    }
  }
  updateLoadFactorAndStoreLimit() {
    this.storageLimit *= 2;
    this.loadFactorNumber = this.storageLimit * 0.75;
  }
  createBucket(key, value) {
    return { key: key, value: value };
  }
  set(key, value) {
    let bucket = this.createBucket(key, value);
    let index = this.hash(key);
    if (this.storage[index] === undefined) {
      this.storage[index] = [bucket];
      this.increaseNumElements();
      this.increaseNumBuckets();
    } else {
      let sameKeyNotFound = true;
      this.storage[index].forEach((element) => {
        if (element.key === key) {
          element.value = bucket.value;
          sameKeyNotFound = false;
        }
      });
      if (sameKeyNotFound) {
        this.storage[index].push(bucket);
        this.increaseNumElements();
      }
    }
    //change the size of the store limit
    if (this.checkLoadFactor()) {
      this.updateLoadFactorAndStoreLimit();
    }
  }
  get(key) {
    let index = this.hash(key);
    if (this.storage[index] !== undefined) {
      if (this.storage[index].length === 1) {
        if (this.storage[index][0].key === key) {
          return this.storage[index][0].value;
        } else {
          return null;
        }
      } else {
        let sameKeyNotFound = true;
        this.storage[index].forEach((element) => {
          if (element.key === key) {
            sameKeyNotFound = false;
            return element.value;
          }
          if (sameKeyNotFound) {
            return null;
          }
        });
      }
    } else {
      return null;
    }
  }
  has(key) {
    let index = this.hash(key);
    if (this.storage[index] !== undefined) {
      if (this.storage[index].length === 1) {
        if (this.storage[index][0].key === key) {
          return true;
        } else {
          return false;
        }
      } else {
        let sameKeyNotFound = true;
        this.storage[index].forEach((element) => {
          if (element.key === key) {
            sameKeyNotFound = false;
            return true;
          }
          if (sameKeyNotFound) {
            return false;
          }
        });
      }
    } else {
      return false;
    }
  }
  remove(key) {
    let index = this.hash(key);
    if (this.storage[index] !== undefined) {
      if (this.storage[index].length === 1) {
        if (this.storage[index][0].key === key) {
          this.decreaseNumElements();
          this.decreaseNumBuckets();
          this.storage[index] = undefined;
        }
      } else {
        this.storage[index].filter(function (element) {
          if (element.key === key) {
            this.decreaseNumElements();
          }
          return element.key !== key;
        });
      }
    }
  }
  clear() {
    for (let index = 0; index < this.storage.length; index++) {
      if (this.storage[index] !== undefined) {
        this.storage[index] = undefined;
      }
    }
    this.storageLimit = 16;
    this.numElements = 0;
    this.numBuckets = 0;
    this.loadFactorNumber = this.storageLimit * 0.75;
  }
  keys() {
    AllTheKeys = [];
    for (let index = 0; index < this.storage.length; index++) {
      if (this.storage[index] !== undefined) {
        if (this.storage[index].length === 1) {
          AllTheKeys.push(this.storage[index][0].value);
        } else {
          this.storage[index].forEach((element) => {
            if (element.key === key) {
              sameKeyNotFound = false;
              return true;
            }
            if (sameKeyNotFound) {
              return false;
            }
          });
        }
      }
    }
  }
  length() {
    return this.numElements;
  }
  increaseNumElements() {
    this.numElements += 1;
  }
  decreaseNumElements() {
    this.numElements -= 1;
  }
  increaseNumBuckets() {
    this.numBuckets += 1;
  }
  decreaseNumBuckets() {
    this.numBuckets -= 1;
  }
}

const hastMap = new HashMap();

export { hastMap };
