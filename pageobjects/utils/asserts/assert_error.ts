export class AssertError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, AssertError.prototype);
  }
}
