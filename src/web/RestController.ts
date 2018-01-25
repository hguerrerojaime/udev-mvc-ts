import { Controller } from './Controller';
import { HttpError } from '../errors/HttpError';

export class RestController extends Controller {
  get contentType() {
    return "application/json";
  }
  sendResponse(response,responseBody) {
    response.json(this.processResponseBody(responseBody));
  }
  sendErrorResponse(response,error) {
    console.error("first");
    const status = error instanceof HttpError ? error.status : 500;
    const errorBody = error instanceof HttpError ? error.toJSON() : { stack: error.stack };
    response.status(status);
    response.json(this.processResponseBody(errorBody));
  }
}
