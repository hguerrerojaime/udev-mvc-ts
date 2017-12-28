import MvcContainer from './MvcContainer';
import MvcOptions from './MvcOptions';
import Router from '../web/Router';

import "reflect-metadata";

export default class Mvc {

  private _options: MvcOptions;
  private _application: any;
  private _container: MvcContainer;


  constructor(_opts: MvcOptions) {
    this._options = Object.assign({},{
      express: require('express'),
      configure: (app) => {}
    },_opts);

    this.init();
  }

  init():void {
    this._container = new MvcContainer(this.options.dependencies);
    this._application = this.options.express();
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
    console.log("Configuring router...");
    for (const key in router) {
      const route = router[key];

      for (const method in route) {
        const routeMapping = route[method];
        console.log(`Configuring ${method} ${key} to controller: ${routeMapping.controller}, action: ${routeMapping.action}`);
        this.configureRoute(key,method,routeMapping.controller,routeMapping.action);
      }
    }
  }

  private configureRoute(route,method,controllerName,actionName) {
    this.application[method](route, function(req,res) {
      const controller = this.container.get(`${controllerName}Controller`);
      const action = controller[actionName];
      const requestProcessor = this.container.get('requestProcessor');
      requestProcessor.process(controller,action,req,res);
    });
  }
}
