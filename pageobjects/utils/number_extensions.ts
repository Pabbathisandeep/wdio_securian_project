interface Number {
  splitBy(partLength: number): number[];
}

if (!Number.prototype.splitBy) {
  Number.prototype.splitBy = function splitBy(partLength: number): number[] {
    if (this === 0) {
      return [0, 0];
    }

    const quotient = Math.floor(this / partLength);
    const numbers: number[] = [];

    numbers.push(0);
    for (let i = partLength-1; i < quotient * partLength; i += partLength) {
      numbers.push(i);
    }
    numbers.push(this);

    return numbers;
  };
}
