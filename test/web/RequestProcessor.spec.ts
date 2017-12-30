import { expect } from 'chai';
import { RequestProcessor, RestController, MvcError } from '../../src/udev-mvc-ts';
import * as MockExpressResponse from 'mock-express-response';
import * as MockExpressRequest from 'mock-express-request';

describe('RequestProcessor Specifications', () => {

  describe('when creating a new instance an call the process method with a valid async action',() => {

    class HelloController extends RestController {
      async greet() {
        return { greeting: "Hello World" };
      }
    }

    const controller = new HelloController();
    const requestProcessor = new RequestProcessor();
    const request = new MockExpressRequest();
    const response = new MockExpressResponse();

    it('should not fail', () => {
      expect(() => requestProcessor.process(controller,controller.greet,request,response)).to.not.throw();
    });

  });

  describe('when creating a new instance an call the process method with a non async action',() => {

    class HelloController extends RestController {
      greet() {
        return { greeting: "Hello World" };
      }
    }

    const controller = new HelloController();
    const requestProcessor = new RequestProcessor();
    const request = new MockExpressRequest();
    const response = new MockExpressResponse();

    it('should throw a MvcError', () => {
      expect(() => requestProcessor.process(controller,controller.greet,request,response)).to.throw(MvcError);
    });

  });

});
