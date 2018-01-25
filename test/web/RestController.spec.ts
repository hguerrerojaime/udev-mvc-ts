import { expect } from 'chai';
import { RestController, ApplicationError, RequestError } from '../../src/udev-mvc-ts';
import * as MockExpressResponse from 'mock-express-response';
import * as MockExpressRequest from 'mock-express-request';

describe('RestController Specifications', () => {

  describe('when creating a new instance with a valid async action',() => {

    class HelloController extends RestController {
      async greet() {
        console.log("executing");
        return { greeting: "Hello World" };
      }
    }

    const controller = new HelloController();
    const request = new MockExpressRequest();
    const response = new MockExpressResponse();

    it('should have status 200 and be the expected object', () => {
      controller.setResponseContentType(response);
      const actionPromise = controller.greet();

      return controller.respond(actionPromise,request,response).then(() => {

        const responseBody = response._getJSON();
        expect(response.statusCode).to.equal(200);
        expect(responseBody).to.deep.equal({ greeting: "Hello World" });
      });

    });

  });

  describe('when creating a new instance with method throwing ApplicationError',() => {

    class HelloController extends RestController {
      async applicationFail() {
         throw new ApplicationError("This happened intentionally");
      }
    }

    const controller = new HelloController();
    const request = new MockExpressRequest();
    const response = new MockExpressResponse();

    it('should have status 500 and be the expected object', () => {
      controller.setResponseContentType(response);
      const actionPromise = controller.applicationFail();
      return controller.respond(actionPromise,request,response).then(() => {
        const responseBody = response._getJSON();
        expect(response.statusCode).to.equal(500);
        expect(responseBody).to.have.deep.property('message',"This happened intentionally");
      });
    });

  });

  describe('when creating a new instance with method throwing RequestError',() => {

    class HelloController extends RestController {
      async applicationFail() {
         throw new RequestError("This happened intentionally");
      }
    }

    const controller = new HelloController();
    const request = new MockExpressRequest();
    const response = new MockExpressResponse();

    it('should have status 400 and be the expected object', () => {
      controller.setResponseContentType(response);
      const actionPromise = controller.applicationFail();
      return controller.respond(actionPromise,request,response).then(() => {
        const responseBody = response._getJSON();
        expect(response.statusCode).to.equal(400);
        expect(responseBody).to.have.deep.property('message',"This happened intentionally");
      });
    });

  });

});
