export class HttpError extends Error {

  private _status:number;
  private _cause:Error;

  constructor(message:string = "Http Error",_status:number = 500,_cause:Error = null) {
    super(message);
    this._status = _status;
    this._cause = _cause;
  }

  get status() {
    return this._status;
  }

  get cause() {
    return this._cause;
  }

  toJSON() {

    let cause = null;

    if (this.cause instanceof HttpError) {
      cause = this.cause.toJSON();
    } else if (this.cause) {
      cause = this.cause.toString();
    }

    return {
      code: this.status,
      message: this.message,
      cause: cause,
      stack: this.stack
    };
  }

}
