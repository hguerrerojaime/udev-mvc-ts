import { Hash } from './Hash';
import { Controller } from '../web/Controller';

export interface Dependencies {
  values?: Object;
  controllers?: Hash<Controller>;
  services?: Object;
  factories?: Object;
}
