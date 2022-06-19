export class InvalidInputError extends Error {
  constructor(message: string) {
    super();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidInputError);
    }

    this.name = "InvalidInputError";
    this.message = message;
  }
}
