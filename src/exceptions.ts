export class InputCannotBeEmptyError extends Error {
  constructor(message: string) {
    super();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InputCannotBeEmptyError);
    }

    this.name = "InputCannotBeEmpty";
    this.message = message;
  }
}

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
