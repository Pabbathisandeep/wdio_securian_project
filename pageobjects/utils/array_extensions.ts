import lodashClonedeep from 'lodash.clonedeep';

declare global {
  interface Array<T> {
    getRandomItem(): T;
    findAsync(predicate: (t: T) => Promise<boolean>): Promise<T | undefined>;
    mapAsync(predicate: (t: T) => Promise<any>): Promise<any[]>;
    equalsWithOrder(b: Array<T>): boolean;
    equalsWithoutOrder(b: Array<T>): boolean;
    deepCopy(): T[];
    remove(value: T): void;
    getLastElement(): T;
    shuffleDeepCopy(): T[];
    shuffle(): T[];
    getRandomItems(count: number): T[];
    sortDesc(): T[];
    sortDeepCopy(): T[];
    sortDescDeepCopy(): T[];
  }
}

Array.prototype.getRandomItem = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.findAsync = async function findAsync<T>(
  predicate: (t: T) => Promise<boolean>
): Promise<T | undefined> {
  for (const t of this) {
    if (await predicate(t)) {
      return t;
    }
  }
  return undefined;
};

Array.prototype.mapAsync = async function mapAsync<T>(
  predicate: (t: T) => Promise<any>
): Promise<any[]> {
  let result: T[] = [];
  for (const t of this) {
    const predicateResult = await predicate(t);
    result.push(predicateResult);
  }
  return result;
};

Array.prototype.equalsWithOrder = function (b) {
  return (
    Array.isArray(this) &&
    Array.isArray(b) &&
    this.length === b.length &&
    this.every((val, index) => val === b[index])
  );
};

Array.prototype.equalsWithoutOrder = function (b) {
  if (
    (Array.isArray(this) && Array.isArray(b) && this.length === b.length) ===
    false
  )
    return false;

  const tempB = b.deepCopy();
  for (const value of this) {
    if (tempB.includes(value)) {
      tempB.remove(value);
    } else {
      return false;
    }
  }
  return true;
};

Array.prototype.deepCopy = function deepCopy<T>(): T[] {
  return lodashClonedeep(this);
};

Array.prototype.remove = function remove<T>(value: T): void {
  var index = this.indexOf(value);
  if (index !== -1) {
    this.splice(index, 1);
  }
};

Array.prototype.getLastElement = function getLastElement<T>(): T {
  return this[this.length - 1];
};

Array.prototype.shuffle = function shuffle<T>(): T[] {
  let currentIndex = this.length;
  let randomIndex: any;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [this[currentIndex], this[randomIndex]] = [
      this[randomIndex],
      this[currentIndex],
    ];
  }

  return this;
};

Array.prototype.shuffleDeepCopy = function shuffleDeepCopy<T>(): T[] {
  const copiedArray = this.deepCopy();
  return copiedArray.shuffle();
};

Array.prototype.getRandomItems = function getRandomItems<T>(
  count: number
): T[] {
  const shuffled = this.shuffle();
  return shuffled.slice(0, count);
};

Array.prototype.sortDesc = function sortDesc<T>(): T[] {
  return this.sort().reverse();
};

Array.prototype.sortDeepCopy = function sortDeepCopy<T>(): T[] {
  const copiedArray = this.deepCopy();
  return copiedArray.sort();
};

Array.prototype.sortDescDeepCopy = function sortDescDeepCopy<T>(): T[] {
  return this.sortDeepCopy().reverse();
};
