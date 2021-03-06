import { Action } from '@ngrx/store';
import { Task } from '../models/task';
import { Pomo } from '../models/pomo';

export enum TaskActionTypes {
  Search = '[Task] Search',
  SearchComplete = '[Task] Search Complete',
  SearchError = '[Task] Search Error',
  Load = '[Task] Load',
  Select = '[Task] Select',
  AddPomo = '[Pomo] Add Pomo',
  AddPomoSuccess = '[Pomo] Add Pomo Success',
  AddPomoFail = '[Pomo] Add Pomo Fail',
  RemovePomo = '[Pomo] Remove Pomo',
  RemovePomoSuccess = '[Pomo] Remove Pomo Success',
  RemovePomoFail = '[Pomo] Remove Pomo Fail',
  LoadPomosSuccess = '[Pomo] Load Pomos Success',
  LoadPomosFail = '[Pomo] Load Pomos Fail',
}

export class Search implements Action {
  readonly type = TaskActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = TaskActionTypes.SearchComplete;

  constructor(public payload: Task[]) {}
}

export class SearchError implements Action {
  readonly type = TaskActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = TaskActionTypes.Load;

  constructor(public payload: Task) {}
}


export class Select implements Action {
  readonly type = TaskActionTypes.Select;

  constructor(public payload: string) {}
}
/**
 * Add Pomo to Task Actions
 */
export class AddPomo implements Action {
  readonly type = TaskActionTypes.AddPomo;
  constructor(public payload: Pomo) {}
}

export class AddPomoSuccess implements Action {
  readonly type = TaskActionTypes.AddPomoSuccess;

  constructor(public payload: any) {}
}

export class AddPomoFail implements Action {
  readonly type = TaskActionTypes.AddPomoFail;

  constructor(public payload: Pomo) {}
}

/**
 * Remove Task from Collection Actions
 */
export class RemovePomo implements Action {
  readonly type = TaskActionTypes.RemovePomo;

  constructor(public payload: Pomo) {}
}

export class RemovePomoSuccess implements Action {
  readonly type = TaskActionTypes.RemovePomoSuccess;

  constructor(public payload: Pomo) {}
}

export class RemovePomoFail implements Action {
  readonly type = TaskActionTypes.RemovePomoFail;

  constructor(public payload: Pomo) {}
}

export class LoadPomosSuccess implements Action {
  readonly type = TaskActionTypes.LoadPomosSuccess;

  constructor(public payload: Pomo[]) {}
}
export class LoadPomosFail implements Action {
  readonly type = TaskActionTypes.LoadPomosFail;

  constructor(public payload: any) {}
}

export type TaskActions =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | Select
  | AddPomo
  | AddPomoSuccess
  | AddPomoFail
  | RemovePomo
  | RemovePomoSuccess
  | RemovePomoFail
  | LoadPomosFail;
