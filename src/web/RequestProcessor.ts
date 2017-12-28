const parameterfy = require('../core/util').parameterfy;
import { injectable } from "inversify";

@injectable()
export default class RequestProcessor {

  process(controller,action,req,res) {
    const actionProxy = parameterfy(action,controller);
    const actionPromise = actionProxy(Object.assign({},{
      $request: req,
      $response: res
    },req.params));

    if (!res.headersSent) {
      controller.setResponseContentType(res);
      controller.respond(actionPromise,req,res);
    }
  }

}
