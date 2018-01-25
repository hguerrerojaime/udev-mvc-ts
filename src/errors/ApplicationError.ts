import { HttpError } from './HttpError';

export class ApplicationError extends HttpError {
  constructor(message = "ApplicationError",_cause:Error = null) {
    super(message,500,_cause);
  }
}
