import { HttpError } from './HttpError';

export class RequestError extends HttpError {
  constructor(message = "ApplicationError",_cause:Error = null) {
    super(message,400,_cause);
  }
}
