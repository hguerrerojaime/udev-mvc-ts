import Hash from '../core/Hash';

export interface RouteMapping {
  controller: string;
  action: string;
}

export interface RouteMethod extends Hash<RouteMapping> {}
export default interface Router extends Hash<RouteMethod> {}
