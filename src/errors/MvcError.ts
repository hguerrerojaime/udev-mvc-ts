export class MvcError extends Error {
  constructor(message = "Mvc unknown error") {
    super(message);
  }
}
