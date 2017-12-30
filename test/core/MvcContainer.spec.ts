import { MvcContainer, RequestProcessor, Controller } from '../../src/udev-mvc-ts';
import { expect } from 'chai';
import { injectable } from "inversify";

describe('MvcContainer Specifications', () => {

  describe('when creating an instance without dependencies',() => {

    const container = new MvcContainer();

    it('should have self as a dependency', () => {
      const self = container.get('container');
      expect(self).to.equal(container);
    });

    it('should have a requestProcessor instance', () => {
      const requestProcessor = container.get('requestProcessor');
      expect(requestProcessor).to.be.an.instanceof(RequestProcessor);
    });

  });

  describe('when creating an instance with a constant dependency PI', () => {

    const container = new MvcContainer({
      values: {
        PI: Math.PI
      }
    });

    it('should have a constant dependency value called PI equal to Math.PI', () => {
      const PI = container.get('PI');
      expect(PI).to.equal(Math.PI);
    });

  });

  describe('when creating an instance with a service dependency', () => {

    @injectable()
    class MyService {}

    const container = new MvcContainer({
      services: {
        myService: MyService
      }
    });

    it('should contain an instance of the registered service', () => {
      const service = container.get('myService');
      expect(service).to.be.an.instanceof(MyService);
    });

  });

  describe('when creating an instance with a valid controller dependency', () => {

    class MyController extends Controller {}

    const container = new MvcContainer({
      controllers: {
        myController: MyController
      }
    });

    it('should contain an instance of the registered service', () => {
      const controller = container.get('myController');
      expect(controller).to.be.an.instanceof(MyController);
    });

  });

  describe('when creating an instance with an invalid controller dependency', () => {

    let container = new MvcContainer();
    @injectable()
    class NotAController {}

    it('should throw a MvcContainerInitializationError', () => {
      expect(() => container.injectController('notAController',NotAController)).to.throw(TypeError);
    });

  });

});
