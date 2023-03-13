import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // Only becasue we are extending a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
