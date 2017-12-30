import { Mvc, MvcContainer, Controller } from '../../src/udev-mvc-ts';
import { expect } from 'chai';

describe('Mvc Specifications', () => {

  describe('when creating an empty instance',() => {

    const mvc = new Mvc();

    it('should contain an instance of an express application', () => {
      const application = mvc.application;
      expect(application).to.exist;
    });

    it('should contain an instance of a MvcContainer', () => {
      const container = mvc.container;
      expect(container).to.be.an.instanceof(MvcContainer);
    });

  });

  describe('when creating an instance with a router',() => {

    class MyController extends Controller {
      async index() {
        return {};
      }
    }

    const mvc = new Mvc({
      dependencies: {
        controllers: {
          myController: MyController
        }
      },
      routes: {
        '/': { get: { controller: "my", action: "index" } }
      }
    });

    it('should not fail', () => {
      const application = mvc.application;
      expect(application).to.exist;
    });

  });

});
