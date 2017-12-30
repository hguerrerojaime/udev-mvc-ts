const parameterfy = require('../core/util').parameterfy;
import { injectable } from "inversify";

import { MvcError } from '../errors/MvcError';

@injectable()
export class RequestProcessor {

  process(controller,action,request,response) {
    const actionProxy = parameterfy(action,controller);
    const actionPromise = actionProxy(Object.assign({},{
      $request: request,
      $response: response
    },request.params));

    if (!(actionPromise instanceof Promise)) {
      throw new MvcError("action must return a promise, either return a promise instance or make the function async");
    }

    if (!response.headersSent) {
      controller.setResponseContentType(response);
      controller.respond(actionPromise,request,response);
    }

  }

}
