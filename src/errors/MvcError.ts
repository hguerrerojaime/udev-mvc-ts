import { HttpError } from './HttpError';

export class MvcError extends HttpError {
  constructor(message = "Mvc unknown error") {
    super(message);
  }
}
