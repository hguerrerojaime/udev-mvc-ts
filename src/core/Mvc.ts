import { MvcContainer } from './MvcContainer';
import { MvcOptions } from './MvcOptions';
import { Router } from '../web/Router';
import { MvcInitializationError } from '../errors/MvcInitializationError';

export class Mvc {

  private _options: MvcOptions;
  private _application: any;
  private _container: MvcContainer;

  constructor(_opts: MvcOptions) {
    this._options = Object.assign({},{
      express: require('express'),
      configure: (app) => {},
      routes: {}
    },_opts);

    this.init();
  }

  init():void {
    this._container = new MvcContainer(this.options.dependencies);
    this._application = this.options.express();
    this.options.configure(this.application);
    this.configureRouter(this.options.routes);
  }

  get options() {
    return this._options;
  }

  get application() {
    return this._application;
  }

  get container() {
    return this._container;
  }

  private configureRouter(router:Router) {
    for (const key in router) {
      const route = router[key];
      for (const method in route) {
        const routeMapping = route[method];
        this.configureRoute(key,method,routeMapping.controller,routeMapping.action);
      }
    }
  }

  private configureRoute(route,method,controllerName,actionName) {
    this.application[method](route, function(req,res) {
      const controller = this.container.get(`${controllerName}Controller`);
      const action = controller[actionName];

      if (!action) {
        throw new MvcInitializationError(`action ${actionName} is undefined for controller ${controllerName}Controller`)
      }

      const requestProcessor = this.container.get('requestProcessor');
      requestProcessor.process(controller,action,req,res);
    });
  }
}
