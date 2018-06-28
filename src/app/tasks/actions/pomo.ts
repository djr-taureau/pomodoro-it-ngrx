import { Action } from '@ngrx/store';
import { Pomo } from '../models/pomo';

export enum PomoActionTypes {
  Load = '[Pomo] Load',
  LoadSuccess = '[Pomo] Load Success',
  LoadFail = '[Pomo] Load Fail',
  Select = '[Pomo] Select',
}

export class Load implements Action {
  readonly type = PomoActionTypes.Load;
  constructor(public payload: Pomo) {}
}
export class LoadSuccess implements Action {
  readonly type = PomoActionTypes.LoadSuccess;
  constructor(public payload: Pomo[]) {}
}

export class LoadFail implements Action {
  readonly type = PomoActionTypes.LoadSuccess;
  constructor(public payload: any) {}
}
export class Select implements Action {
  readonly type = PomoActionTypes.Select;

  constructor(public payload: string) {}
}

export type PomoActions =
  | Load
  | LoadSuccess
  | LoadFail
  | Select;
