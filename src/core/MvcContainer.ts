import { Container } from "inversify";
import { Dependencies } from './Dependencies';
import { RequestProcessor } from '../web/RequestProcessor';
import { Controller } from '../web/Controller';

export class MvcContainer extends Container {

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
      this.injectValue(key,value);
    }
  }

  public injectValue(key,value) {
    this.bind(key).toConstantValue(value);
  }

  private injectControllers() {
    const controllers = this.dependencies.controllers;
    for (const key in controllers) {
      const value = controllers[key];
      this.injectController(key,value);
    }
  }

  public injectController(key,value) {
    const isController = value.prototype instanceof Controller;
    if (!isController) {
      throw new TypeError(`${key} must extend a Controller Type`);
    }
    this.bind(key).to(value);
  }

  private injectFactories() {
    const factories = this.dependencies.factories;
    for (const key in factories) {
      const value = factories[key];
      this.injectFactory(key,value);
    }
  }

  public injectFactory(key,value) {
    this.bind(key).toFactory(value);
  }

  private injectServices() {
    const services = this.dependencies.services;
    for (const key in services) {
      const value = services[key];
      this.injectService(key,value);
    }
  }

  public injectService(key,value) {
    this.bind(key).to(value);
  }

  private injectSelf() {
    this.bind('container').toConstantValue(this);
  }

  private injectRequestProcessor() {
    this.bind('requestProcessor').to(RequestProcessor);
  }


}
