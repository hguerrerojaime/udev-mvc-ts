import { injectable } from "inversify";

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
    actionPromise.then((responseBody) => this.sendResponse(response,responseBody));
  }
  sendResponse(response,responseBody) {
    response.send(this.processResponseBody(responseBody));
  }
}
