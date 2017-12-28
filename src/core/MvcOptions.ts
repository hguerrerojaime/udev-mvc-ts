import Router from '../web/Router';
import Dependencies from './Dependencies';

export default interface MvcOptions {
  express?: any;
  configure: Function;
  routes: Router,
  dependencies: Dependencies
}
