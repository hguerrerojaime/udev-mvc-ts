import { Controller } from './Controller';

export class RestController extends Controller {
  get contentType() {
    return "application/json";
  }
  sendResponse(response,responseBody) {
    response.json(this.processResponseBody(responseBody));
  }
}
