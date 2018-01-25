import { injectable } from "inversify";
import { HttpError } from '../errors/HttpError';

@injectable()
export class Controller {
  get contentType() {
    return "text/plain";
  }
  processResponseBody(responseBody) {
    return responseBody;
  }
  setResponseContentType(response) {
    response.set('Content-Type', this.contentType);
  }
  respond(actionPromise,request,response) {
    return actionPromise
      .then((responseBody) => this.sendResponse(response,responseBody))
      .catch((error) => this.sendErrorResponse(response,error))
    ;
  }
  sendResponse(response,responseBody) {
    response.send(this.processResponseBody(responseBody));
  }
  sendErrorResponse(response,error) {
    const status = error instanceof HttpError ? error.status : 500;
    const errorBody = error.stack;
    response.status(status);
    response.send(this.processResponseBody(errorBody));
  }
}
