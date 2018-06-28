import { Action } from '@ngrx/store';
import { Pomo } from '../models/pomo';

export enum PomoActionTypes {
  Load = '[Pomo] Load',
  LoadSuccess = '[Pomo] Load Success',
  LoadFail = '[Pomo] Load Fail',
  Select = '[Pomo] Select',
}
/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handPomo/advanced-types.html#discriminated-unions
 */

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

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PomoActions =
  | Load
  | LoadSuccess
  | LoadFail
  | Select;
