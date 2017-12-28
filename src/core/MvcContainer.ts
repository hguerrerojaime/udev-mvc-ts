import { Container } from "inversify";
import Dependencies from './Dependencies';

export default class MvcContainer extends Container {

  private _dependencies;

  constructor(_dependencies: Dependencies) {
    super();
    this._dependencies = Object.assign({},{
      values: {},
      controllers: {},
      services: {},
      factories: {}
    },_dependencies);

    this.injectDependencies();
  }

  get dependencies() {
    return this._dependencies;
  }

  private injectDependencies() {
    this.injectValues();
    this.injectServices();
    this.injectFactories();
    this.injectControllers();
    this.injectRequestProcessor();
    this.injectSelf();
  }

  private injectValues() {
    const values = this.dependencies.values;

    for (const key in values) {
      const value = values[key];
      console.log(`Register value [${key}]`);
      this.bind(key).toConstantValue(value);
    }
  }

  private injectControllers() {
    const controllers = this.dependencies.controllers;
    for (const key in controllers) {
      const value = controllers[key];
      console.log(`Register controller [${key}]`);
      this.bind(key).to(value);
    }
  }

  private injectFactories() {
    const factories = this.dependencies.factories;
    for (const key in factories) {
      const value = factories[key];
      console.log(`Register factory [${key}]`);
      this.bind(key).toFactory(value);
    }
  }

  private injectServices() {
    const services = this.dependencies.services;
    for (const key in services) {
      const value = services[key];
      console.log(`Register service [${key}]`);
      this.bind(key).to(value);
    }
  }

  private injectSelf() {
    this.bind('self').toConstantValue(this);
  }

  private injectRequestProcessor() {
    this.bind('requestProcessor').to(require('../web/RequestProcessor').default);
  }


}
