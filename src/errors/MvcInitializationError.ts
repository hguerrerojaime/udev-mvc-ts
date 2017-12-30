import { MvcError } from './MvcError';

export class MvcInitializationError extends MvcError {
  constructor(message) {
    super(message);
  }
}
